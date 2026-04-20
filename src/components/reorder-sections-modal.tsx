import { api } from "@/lib/api";
import type { SectionResponse } from "@/types/sections";
import { DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQuery } from "@tanstack/react-query";
import { GripVertical, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

function SortableRow({ section }: { section: SectionResponse }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.sectionId });
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 p-3 rounded-lg border bg-background"
        >
            <GripVertical
                {...attributes}
                {...listeners}
                className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing touch-none shrink-0"
            />
            <span className="text-sm">{section.title}</span>
        </div>
    );
}

interface ReorderSectionsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (ordered: SectionResponse[]) => void;
    isPending: boolean;
    parentSectionId: number | null;
    campaignId: string;
    token: string;
}

export function ReorderSectionsModal({ open, onOpenChange, onSave, isPending, parentSectionId, campaignId, token }: ReorderSectionsModalProps) {
    const [ordered, setOrdered] = useState<SectionResponse[]>([]);

    const parentId = parentSectionId;

    const { data: topLevelSections, isLoading: isLoadingTop } = useQuery({
        queryKey: ['sections', parseInt(campaignId)],
        queryFn: () => api.get<SectionResponse[]>(`/campaigns/${campaignId}/sections`, token),
        enabled: open && parentId === null,
    });

    const { data: parentSection, isLoading: isLoadingParent } = useQuery({
        queryKey: ['section', String(parentId)],
        queryFn: () => api.get<SectionResponse>(`/campaigns/${campaignId}/sections/${parentId}`, token),
        enabled: open && parentId !== null,
    });

    useEffect(() => {
        if (parentId === null && topLevelSections) {
            setOrdered(topLevelSections);
        } else if (parentId !== null && parentSection) {
            setOrdered(parentSection.subSections);
        }
    }, [topLevelSections, parentSection, parentId]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = ordered.findIndex(s => s.sectionId === active.id);
        const newIndex = ordered.findIndex(s => s.sectionId === over.id);
        setOrdered(arrayMove(ordered, oldIndex, newIndex));
    };

    const isLoading = isLoadingTop || isLoadingParent;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Reorder sections</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                    {isLoading ? (
                        <div className="flex justify-center py-6">
                            <Loader2 className="animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={ordered.map(s => s.sectionId)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-1.5">
                                    {ordered.map(s => <SortableRow key={s.sectionId} section={s} />)}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button onClick={() => onSave(ordered)} disabled={isPending || isLoading}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Save order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
