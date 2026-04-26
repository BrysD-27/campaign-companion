import { CreateSectionModal } from '@/components/create-section-modal'
import { DeleteSectionModal } from '@/components/delete-section-modal'
import { EditSectionModal } from '@/components/edit-section-modal'
import { EntryCard, NewEntryCard } from '@/components/entry-card'
import { ReorderEntriesModal } from '@/components/reorder-entries-modal'
import SectionPageSkeleton from '@/components/section-page-skeleton'
import { ShareSectionPopover } from '@/components/share-section-popover'
import { Badge } from '@/components/ui/badge'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/context/auth-context'
import { useCampaignContext } from '@/context/campaign-context'
import { useCampaignRole } from '@/hooks/use-campaign-role'
import { api } from '@/lib/api'
import type { EntryResponse } from '@/types/entry'
import type { CreateSectionRequest, SectionResponse, UpdateSectionRequest } from '@/types/sections'
import { DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    ArrowUpDown,
    Check,
    GripVertical,
    Pencil,
    Pin,
    PinOff,
    Plus,
    Trash2,
    X,
} from 'lucide-react'

import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function SortableSubSection({ sub, campaignId, onNavigate, isDM, onPin }: { sub: SectionResponse; campaignId: string; onNavigate: () => void; isDM: boolean; onPin: (sub: SectionResponse) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sub.sectionId });
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onNavigate}
            className="flex items-center bg-card justify-between p-3 rounded-lg border border-border group cursor-pointer hover:bg-accent transition-colors"
        >
            <div>
                <p className="text-sm font-medium">
                    {sub.title}
                    {sub.isDmOnly && <Badge variant="secondary" className="text-xs py-0">DM only</Badge>}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground transition-colors">{sub.entries.length} entries</p>
                </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <button
                    onClick={(e) => { e.stopPropagation(); onPin(sub); }}
                    title={sub.isPinned ? 'Unpin' : 'Pin'}
                    className={`group/pin p-1 rounded transition-all hover:!bg-foreground/15 ${sub.isPinned ? 'opacity-100 text-primary' : 'opacity-100 xl:opacity-0 group-hover:opacity-100 text-muted-foreground/60'}`}
                >
                    {sub.isPinned ? (
                        <>
                            <Pin className="h-3.5 w-3.5 fill-current group-hover/pin:hidden" />
                            <PinOff className="h-3.5 w-3.5 hidden group-hover/pin:block" />
                        </>
                    ) : (
                        <Pin className="h-3.5 w-3.5" />
                    )}
                </button>
                {isDM && (
                    <GripVertical
                        {...attributes}
                        {...listeners}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 text-muted-foreground/40 shrink-0 cursor-grab active:cursor-grabbing touch-none"
                    />
                )}
            </div>
        </div>
    );
}

const SectionPage = () => {
    const { campaignId, sectionId } = useParams();
    const { token } = useAuth();
    const { members } = useCampaignContext();
    const { isDM } = useCampaignRole();
    const navigate = useNavigate();
    const [subsectionDialogOpen, setSubsectionDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [inlineEditTitle, setInlineEditTitle] = useState('');
    const [inlineEditing, setInlineEditing] = useState(false);
    const [orderedSubSections, setOrderedSubSections] = useState<SectionResponse[]>([]);
    const [addingEntry, setAddingEntry] = useState(false);
    const [reorderEntriesOpen, setReorderEntriesOpen] = useState(false);

    const queryClient = useQueryClient();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const { data: section, isLoading } = useQuery({
        queryKey: ['section', sectionId],
        queryFn: () => api.get<SectionResponse>(`/campaigns/${campaignId}/sections/${sectionId}`, token!)
    });

    const { data: entries = [] } = useQuery({
        queryKey: ['entries', sectionId],
        queryFn: () => api.get<EntryResponse[]>(`/campaigns/${campaignId}/entries?sectionId=${sectionId}`, token!),
        enabled: !!sectionId,
    });

    useEffect(() => {
        if (section) setOrderedSubSections(section.subSections);
    }, [section]);

    const { mutate: updateSection, isPending: isUpdatePending } = useMutation({
        mutationFn: (request: UpdateSectionRequest) =>
            api.put<SectionResponse>(`/campaigns/${campaignId}/sections/${sectionId}`, request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['section', sectionId] });
            queryClient.invalidateQueries({ queryKey: ['sections', parseInt(campaignId!)] });
            setEditDialogOpen(false);
            setInlineEditing(false);
        }
    });

    const { mutate: pinSection } = useMutation({
        mutationFn: (target: SectionResponse) => target.isPinned
            ? api.delete(`/campaigns/${campaignId}/pins`, token!, { resourceType: 'section', resourceId: target.sectionId })
            : api.post(`/campaigns/${campaignId}/pins`, { resourceType: 'section', resourceId: target.sectionId }, token!),
        onMutate: async (target) => {
            await queryClient.cancelQueries({ queryKey: ['section', sectionId] });
            const previous = queryClient.getQueryData<SectionResponse>(['section', sectionId]);
            queryClient.setQueryData<SectionResponse>(['section', sectionId], (old) => {
                if (!old) return old;
                const updated = old.subSections.map(s =>
                    s.sectionId === target.sectionId ? { ...s, isPinned: !s.isPinned } : s
                );
                return {
                    ...old, subSections: [...updated].sort((a, b) => {
                        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
                        return a.sortOrder - b.sortOrder;
                    })
                };
            });
            return { previous };
        },
        onError: (_, __, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(['section', sectionId], ctx.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['section', sectionId] }),
    });


    const { mutate: reorderSections } = useMutation({
        mutationFn: (sections: SectionResponse[]) => api.patch(
            `/campaigns/${campaignId}/sections/reorder`,
            { sections: sections.map((s, i) => ({ sectionId: s.sectionId, sortOrder: i, parentSectionId: s.parentSectionId })) },
            token!
        ),
        onError: () => {
            if (section) setOrderedSubSections(section.subSections);
            toast.error('Error reordering sections.');
        }
    });


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = orderedSubSections.findIndex(s => s.sectionId === active.id);
        const newIndex = orderedSubSections.findIndex(s => s.sectionId === over.id);
        const reordered = arrayMove(orderedSubSections, oldIndex, newIndex);
        setOrderedSubSections(reordered);
        reorderSections(reordered);
    };

    const { mutate: deleteSection, isPending: isDeletePending } = useMutation({
        mutationFn: () => api.delete(`/campaigns/${campaignId}/sections/${sectionId}`, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections', parseInt(campaignId!)] });
            setDeleteDialogOpen(false);
            if (section?.parentSectionId) {
                navigate(`/campaigns/${campaignId}/sections/${section.parentSectionId}`);
            } else {
                navigate(`/campaigns/${campaignId}`);
            }
        }
    });

    const { mutate: reorderEntries, isPending: isReorderEntriesPending } = useMutation({
        mutationFn: (items: { entryId: number; sortOrder: number }[]) =>
            api.patch(`/campaigns/${campaignId}/entries/reorder`, { entries: items }, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['entries', sectionId] });
            setReorderEntriesOpen(false);
        },
        onError: () => toast.error('Error reordering entries.'),
    });

    const { mutate: createSection, isPending } = useMutation({
        mutationFn: (request: CreateSectionRequest) => {
            request.parentSectionId = parseInt(sectionId!);
            return api.post<SectionResponse>(`/campaigns/${campaignId}/sections`, request, token!);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['section', sectionId] });
            setSubsectionDialogOpen(false);
        }
    });

    if (isLoading) return <SectionPageSkeleton />
    if (!section) return <p className="p-6 text-sm text-muted-foreground">Section not found.</p>

    return (
        <div className="p-6 space-y-6 mb-50">

            {/* Breadcrumbs */}
            <Breadcrumb>
                <BreadcrumbList>
                    {section.ancestry.map((crumb) => (
                        <Fragment key={crumb.sectionId}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/campaigns/${campaignId}/sections/${crumb.sectionId}`)}
                                >
                                    {crumb.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{section.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                {section.parentSectionId && isDM ? (
                    inlineEditing ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                                autoFocus
                                className="text-2xl font-medium bg-transparent border-b border-border focus:outline-none min-w-0 flex-1"
                                value={inlineEditTitle}
                                onChange={(e) => setInlineEditTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') updateSection({ title: inlineEditTitle });
                                    if (e.key === 'Escape') setInlineEditing(false);
                                }}
                            />
                            <Button size="icon" variant="ghost" className="shrink-0" disabled={isUpdatePending || !inlineEditTitle.trim()} onClick={() => updateSection({ title: inlineEditTitle })}>
                                <Check className="size-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="shrink-0" onClick={() => setInlineEditing(false)}>
                                <X className="size-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group">
                            <h1 className="text-2xl font-medium">{section.title}</h1>
                            {section.isDmOnly && <Badge variant="secondary">DM only</Badge>}
                            <Button
                                size="icon" variant="ghost"
                                className=""
                                onClick={() => { setInlineEditTitle(section.title); setInlineEditing(true); }}
                            >
                                <Pencil className="size-4" />
                            </Button>
                        </div>
                    )
                ) : (
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-medium">{section.title}</h1>
                        {section.isDmOnly && <Badge variant="secondary">DM only</Badge>}
                    </div>
                )}
                {
                    isDM && (
                        <div className="flex flex-wrap items-center gap-2">
                            {!section.parentSectionId && (
                                <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                                    <Pencil />
                                    Edit
                                </Button>
                            )}
                            <ShareSectionPopover
                                section={section}
                                members={members}
                                campaignId={campaignId!}
                                sectionId={sectionId!}
                                token={token!}
                            />
                            <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10" onClick={() => setDeleteDialogOpen(true)}>
                                <Trash2 />
                                Delete
                            </Button>
                        </div>
                    )
                }
            </div>

            {/* Subsections */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subsections</p>
                    {
                        isDM && (
                            <Button variant="outline" size="sm" onClick={() => setSubsectionDialogOpen(true)}>
                                <Plus />
                                Add subsection
                            </Button>
                        )
                    }
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={orderedSubSections.map(s => s.sectionId)} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {orderedSubSections.map((sub) => (
                                <SortableSubSection
                                    key={sub.sectionId}
                                    sub={sub}
                                    isDM={isDM}
                                    campaignId={campaignId!}
                                    onNavigate={() => navigate(`/campaigns/${campaignId}/sections/${sub.sectionId}`)}
                                    onPin={pinSection}
                                />
                            ))}
                            {
                                isDM && (
                                    <button
                                        onClick={() => setSubsectionDialogOpen(true)}
                                        className="flex items-center gap-2 p-3 hover:bg-accent rounded-lg border border-dashed text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add subsection
                                    </button>
                                )
                            }
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {/* Entries */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Entries</p>
                    {isDM && !addingEntry && (
                        <div className='flex flex-wrap items-center gap-2'>
                            <Button variant="outline" size="sm" onClick={() => setReorderEntriesOpen(true)}>
                                <ArrowUpDown />
                                Reorder
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setAddingEntry(true)}>
                                <Plus />
                                Add entry
                            </Button>
                        </div>
                    )}
                </div>
                <div className="space-y-3">
                    {entries.map((entry) => (
                        <EntryCard
                            key={entry.entryId}
                            entry={entry}
                            campaignId={campaignId!}
                            sectionId={sectionId!}
                            token={token!}
                            isDM={isDM}
                            members={members}
                        />
                    ))}
                    {addingEntry && (
                        <NewEntryCard
                            campaignId={campaignId!}
                            sectionId={sectionId!}
                            token={token!}
                            sortOrder={entries.length}
                            onClose={() => setAddingEntry(false)}
                        />
                    )}
                    {isDM && !addingEntry && (
                        <button
                            onClick={() => setAddingEntry(true)}
                            className="flex items-center hover:bg-accent gap-2 p-3 w-full rounded-lg border border-dashed text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add entry
                        </button>
                    )}
                </div>
            </div>

            <Separator />

            {/* Player notes */}
            <div className="space-y-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Player notes</p>
                {section.shares.map((share) => (
                    <div key={share.campaignMemberId} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-800 shrink-0">
                                {share.characterName.slice(0, 2).toUpperCase()}
                            </div>
                            <p className="text-sm font-medium">{share.characterName}</p>
                        </div>
                        <div className="bg-muted rounded-md px-3 py-2 text-sm text-muted-foreground leading-relaxed ml-9">
                            No notes yet.
                        </div>
                    </div>
                ))}
            </div>
            <DeleteSectionModal open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={deleteSection}
                isPending={isDeletePending}
                sectionTitle={section.title} />
            <EditSectionModal open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onSubmit={updateSection}
                isPending={isUpdatePending}
                section={section} />
            <CreateSectionModal open={subsectionDialogOpen}
                onOpenChange={setSubsectionDialogOpen}
                onSubmit={createSection}
                isPending={isPending}
                parentSectionId={section.sectionId} />
            <ReorderEntriesModal
                open={reorderEntriesOpen}
                onOpenChange={setReorderEntriesOpen}
                entries={entries}
                onSave={reorderEntries}
                isPending={isReorderEntriesPending} />
        </div>
    )
}

export default SectionPage
