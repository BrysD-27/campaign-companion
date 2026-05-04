import type { EntryResponse } from '@/types/entry'
import { DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { JSONContent } from '@tiptap/react'
import { GripVertical, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'

interface ReorderEntriesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    entries: EntryResponse[]
    onSave: (entries: { entryId: number; sortOrder: number }[]) => void
    isPending: boolean
}

function SortableEntryRow({ entry }: { entry: EntryResponse }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entry.entryId })
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }
    const getPreview = (content: string, maxLength = 100): string => {
        const parsed: JSONContent = JSON.parse(content);
        
        const text = parsed.content
            ?.flatMap(node => node.content ?? [])
            .filter(node => node.type === 'text')
            .map(node => node.text ?? '')
            .join(' ') ?? '';

        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
        >
            <button
                {...attributes}
                {...listeners}
                className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none"
            >
                <GripVertical className="h-4 w-4 cursor-grab active:cursor-grabbing" />
            </button>
            <p className="text-sm flex-1 truncate">
                {getPreview(entry.content!) ? getPreview(entry.content!) : <span className="text-muted-foreground italic">Empty entry</span>}
            </p>
        </div>
    )
}

export function ReorderEntriesModal({ open, onOpenChange, entries, onSave, isPending }: ReorderEntriesModalProps) {
    const [ordered, setOrdered] = useState<EntryResponse[]>([]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    useEffect(() => {
        if (open) setOrdered([...entries].sort((a, b) => a.sortOrder - b.sortOrder))
    }, [open])

    const handleOpenChange = (next: boolean) => {
        onOpenChange(next)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = ordered.findIndex(e => e.entryId === active.id)
        const newIndex = ordered.findIndex(e => e.entryId === over.id)
        setOrdered(arrayMove(ordered, oldIndex, newIndex))
    }

    const handleSave = () => {
        onSave(ordered.map((e, i) => ({ entryId: e.entryId, sortOrder: i })))
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Reorder entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-2 max-h-[60vh] overflow-y-auto">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={ordered.map(e => e.entryId)} strategy={verticalListSortingStrategy}>
                            {ordered.map(entry => (
                                <SortableEntryRow key={entry.entryId} entry={entry} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Save order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
