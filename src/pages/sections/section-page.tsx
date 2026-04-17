import SectionPageSkeleton from '@/components/section-page-skeleton'
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
import { api } from '@/lib/api'
import type { SectionResponse } from '@/types/sections'
import { useQuery } from '@tanstack/react-query'
import {
    ArrowLeftRight,
    Eye,
    GripVertical,
    Pencil,
    Plus,
    Trash2
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const SectionPage = () => {
    const { campaignId, sectionId } = useParams()
    const { token } = useAuth()
    const navigate = useNavigate()

    const { data: section, isLoading } = useQuery({
        queryKey: ['section', sectionId],
        queryFn: () => api.get<SectionResponse>(`/campaigns/${campaignId}/sections/${sectionId}`, token!)
    })

    if (isLoading) return <SectionPageSkeleton />
    if (!section) return <p className="p-6 text-sm text-muted-foreground">Section not found.</p>

    return (
        <div className="p-6 space-y-6">

            {/* Breadcrumbs */}
            <Breadcrumb>
                <BreadcrumbList>
                    {section.ancestry.map((crumb) => (
                        <BreadcrumbItem key={crumb.sectionId}>
                            <BreadcrumbLink
                                className="cursor-pointer"
                                onClick={() => navigate(`/campaigns/${campaignId}/sections/${crumb.sectionId}`)}
                            >
                                {crumb.title}
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                        </BreadcrumbItem>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{section.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="text-2xl font-medium">{section.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <ArrowLeftRight />
                        Reorder
                    </Button>
                    <Button variant="outline" size="sm">
                        <Pencil />
                        Edit
                    </Button>
                    <Button variant="outline" size="sm">
                        <Eye />
                        Share
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                        <Trash2 />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Subsections */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subsections</p>
                    <Button variant="outline" size="sm">
                        <Plus />
                        Add subsection
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {section.subSections.map((sub) => (
                        <div
                            key={sub.sectionId}
                            onClick={() => navigate(`/campaigns/${campaignId}/sections/${sub.sectionId}`)}
                            className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                        >
                            <div>
                                <p className="text-sm font-medium">{sub.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-xs text-muted-foreground">{sub.entries.length} entries</p>
                                    {sub.isDmOnly && <Badge variant="secondary" className="text-xs py-0">DM only</Badge>}
                                </div>
                            </div>
                            <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        </div>
                    ))}
                    <button
                        onClick={() => {/* open add subsection modal */ }}
                        className="flex items-center gap-2 p-3 rounded-lg border border-dashed text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add subsection
                    </button>
                </div>
            </div>

            {/* Entries */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Entries</p>
                    <Button variant="outline" size="sm">
                        <Plus />
                        Add entry
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {section.entries.map((entry) => (
                        <div
                            key={entry.entryId}
                            onClick={() => navigate(`/campaigns/${campaignId}/entries/${entry.entryId}`)}
                            className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                        >
                            <div>
                                <p className="text-sm font-medium">{entry.title}</p>
                            </div>
                            <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        </div>
                    ))}
                    <button
                        onClick={() => {/* open add entry modal */ }}
                        className="flex items-center gap-2 p-3 rounded-lg border border-dashed text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add entry
                    </button>
                </div>
            </div>

            <Separator />

            {/* Blocks */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Blocks</p>
                    <Button variant="outline" size="sm">
                        <Plus />
                        Add block
                    </Button>
                </div>
                <div className="space-y-3">
                    {section?.blocks?.length > 0 && section.blocks.map((block, index) => (
                        <div
                            key={block.entryBlockId}
                            className={`rounded-lg border p-4 space-y-2 ${block.isDmOnly ? 'border-l-2 border-l-amber-400' : ''}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Block {index + 1}</span>
                                    {block.isDmOnly && <Badge variant="secondary" className="text-xs py-0">DM only</Badge>}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm">
                                        <Pencil className="h-3 w-3" />
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-3 w-3" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed">{block.content}</p>
                        </div>
                    ))}
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
        </div>
    )
}

export default SectionPage
