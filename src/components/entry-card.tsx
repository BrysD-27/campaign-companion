import { api } from '@/lib/api'
import type { EntryResponse } from '@/types/entry'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    AlignCenter, AlignLeft, AlignRight,
    Bold, Heading1, Heading2, Heading3,
    ImageIcon, Italic, List, ListOrdered, ListTodo,
    Loader2, Minus, Pencil, Pin, PinOff,
    Quote, Strikethrough, Table as TableIcon,
    Underline as UnderlineIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

const EXTENSIONS = [
    StarterKit,
    Underline,
    Image,
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({ nested: true }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
]

function parseContent(raw: string | null) {
    if (!raw) return null
    try { return JSON.parse(raw) }
    catch { return null }
}

function Divider() {
    return <div className="w-px h-5 bg-border mx-0.5 shrink-0" />
}

function ToolbarBtn({ onClick, active, title, children }: { onClick: () => void; active: boolean; title?: string; children: React.ReactNode }) {
    return (
        <button
            type="button"
            title={title}
            onMouseDown={(e) => { e.preventDefault(); onClick() }}
            className={`p-1.5 rounded transition-colors shrink-0 ${active ? 'bg-accent text-accent-foreground' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
        >
            {children}
        </button>
    )
}

function ImageInput({ onInsert }: { onInsert: (url: string) => void }) {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState('')

    if (!open) {
        return (
            <ToolbarBtn onClick={() => setOpen(true)} active={false} title="Insert image">
                <ImageIcon className="h-4 w-4" />
            </ToolbarBtn>
        )
    }

    return (
        <div className="flex items-center gap-1">
            <input
                autoFocus
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && url.trim()) { onInsert(url.trim()); setUrl(''); setOpen(false) }
                    if (e.key === 'Escape') { setUrl(''); setOpen(false) }
                }}
                placeholder="Image URL…"
                className="h-7 text-xs px-2 border rounded bg-background w-36 focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); if (url.trim()) { onInsert(url.trim()); setUrl(''); setOpen(false) } }}
                className="text-xs px-2 h-7 rounded bg-accent text-accent-foreground"
            >OK</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setUrl(''); setOpen(false) }} className="text-xs px-1 h-7 text-muted-foreground hover:text-foreground">✕</button>
        </div>
    )
}

function EditorToolbar({ editor }: { editor: Editor }) {
    return (
        <div className="flex items-center gap-0.5 p-1 mb-2 border rounded-md bg-muted/40 flex-wrap">
            {/* Text formatting */}
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
                <Bold className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
                <Italic className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
                <UnderlineIcon className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
                <Strikethrough className="h-4 w-4" />
            </ToolbarBtn>

            <Divider />

            {/* Headings */}
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
                <Heading1 className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
                <Heading2 className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
                <Heading3 className="h-4 w-4" />
            </ToolbarBtn>

            <Divider />

            {/* Alignment */}
            <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">
                <AlignLeft className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">
                <AlignCenter className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">
                <AlignRight className="h-4 w-4" />
            </ToolbarBtn>

            <Divider />

            {/* Lists */}
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
                <List className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list">
                <ListOrdered className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} title="Task list">
                <ListTodo className="h-4 w-4" />
            </ToolbarBtn>

            <Divider />

            {/* Blocks */}
            <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
                <Quote className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Horizontal rule">
                <Minus className="h-4 w-4" />
            </ToolbarBtn>
            <ToolbarBtn
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                active={editor.isActive('table')}
                title="Insert table"
            >
                <TableIcon className="h-4 w-4" />
            </ToolbarBtn>

            <Divider />

            {/* Image */}
            <ImageInput onInsert={(url) => editor.chain().focus().setImage({ src: url }).run()} />
        </div>
    )
}

interface NewEntryCardProps {
    campaignId: string
    sectionId: string
    token: string
    sortOrder: number
    onClose: () => void
}

export function NewEntryCard({ campaignId, sectionId, token, sortOrder, onClose }: NewEntryCardProps) {
    const [tab, setTab] = useState<'write' | 'preview'>('write')
    const queryClient = useQueryClient()

    const editor = useEditor({ extensions: EXTENSIONS, content: null, editable: true })

    const handleTabChange = (next: 'write' | 'preview') => {
        setTab(next)
        editor?.setEditable(next === 'write')
        if (next === 'write') editor?.commands.focus()
    }

    const { mutate: create, isPending } = useMutation({
        mutationFn: () => api.post(
            `/campaigns/${campaignId}/entries`,
            { sectionId: parseInt(sectionId), content: JSON.stringify(editor!.getJSON()), isDmOnly: false, sortOrder },
            token
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['entries', sectionId] })
            queryClient.invalidateQueries({ queryKey: ['section', sectionId] })
            onClose()
        },
    })

    return (
        <div className="text-sm border border-border rounded-lg">
            <div className="p-5">
                <div className="border-b mb-3 pb-2">
                    <div className="flex gap-2 mb-2">
                        {(['write', 'preview'] as const).map((t) => (
                            <Button key={t}
                                variant={tab === t ? 'default' : 'outline'}
                                className={`text-sm py-1 px-3 capitalize transition-colors`}
                                onClick={() => handleTabChange(t)}>
                                {t}
                            </Button>
                        ))}
                    </div>
                </div>
                {tab === 'write' && editor && <EditorToolbar editor={editor} />}
                <div className={`rounded-md ${tab === 'write' ? 'border px-3 py-2 focus-within:ring-1 focus-within:ring-ring' : ''}`}>
                    <EditorContent editor={editor} />
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" onClick={onClose} disabled={isPending}>Cancel</Button>
                    <Button size="sm" onClick={() => create()} disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface EntryCardProps {
    entry: EntryResponse
    campaignId: string
    sectionId: string
    token: string
    isDM: boolean
}

export function EntryCard({ entry, campaignId, sectionId, token, isDM }: EntryCardProps) {
    const [editing, setEditing] = useState(false)
    const [tab, setTab] = useState<'write' | 'preview'>('write')
    const queryClient = useQueryClient()
    const savedContent = useRef(entry.content)

    const editor = useEditor({ extensions: EXTENSIONS, content: parseContent(entry.content), editable: false })

    useEffect(() => {
        if (editor && entry.entryId) {
            editor.commands.setContent(parseContent(entry.content))
            savedContent.current = entry.content
        }
    }, [entry.entryId])

    const enterEdit = () => {
        editor?.setEditable(true)
        editor?.commands.focus()
        setEditing(true)
        setTab('write')
    }

    const handleCancel = () => {
        editor?.commands.setContent(parseContent(savedContent.current))
        editor?.setEditable(false)
        setEditing(false)
        setTab('write')
    }

    const handleTabChange = (next: 'write' | 'preview') => {
        setTab(next)
        editor?.setEditable(next === 'write')
        if (next === 'write') editor?.commands.focus()
    }

    const { mutate: save, isPending: isSaving } = useMutation({
        mutationFn: () => api.put(
            `/campaigns/${campaignId}/entries/${entry.entryId}`,
            { content: JSON.stringify(editor!.getJSON()), isDmOnly: entry.isDmOnly, sortOrder: entry.sortOrder },
            token
        ),
        onSuccess: () => {
            savedContent.current = JSON.stringify(editor!.getJSON())
            queryClient.invalidateQueries({ queryKey: ['entries', sectionId] })
            editor?.setEditable(false)
            setEditing(false)
            setTab('write')
        },
    })

    const { mutate: togglePin } = useMutation({
        mutationFn: () => entry.isPinned
            ? api.delete(`/campaigns/${campaignId}/pins`, token, { resourceType: 'entry', resourceId: entry.entryId })
            : api.post(`/campaigns/${campaignId}/pins`, { resourceType: 'entry', resourceId: entry.entryId }, token),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['entries', sectionId] })
            const previous = queryClient.getQueryData<EntryResponse[]>(['entries', sectionId])
            queryClient.setQueryData<EntryResponse[]>(['entries', sectionId], (old = []) => {
                const updated = old.map(e => e.entryId === entry.entryId ? { ...e, isPinned: !e.isPinned } : e)
                return [...updated].sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
            })
            return { previous }
        },
        onError: (_, __, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(['entries', sectionId], ctx.previous)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['entries', sectionId] }),
    })

    return (
        <div className="border border-border rounded-lg text-sm">
            {editing ? (
                <div className="p-5">
                    <div className="border-b mb-3 pb-2">
                        <div className='flex gap-2 mb-2'>
                            {(['write', 'preview'] as const).map((t) => (
                                <Button key={t} onClick={() => handleTabChange(t)}
                                    variant={tab === t ? 'default' : 'outline'}
                                    className={`text-sm pb-1 border-b-2 -mb-[calc(0.5rem+1px)] capitalize transition-colors ${tab === t ? 'border-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                                    {t}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {tab === 'write' && editor && <EditorToolbar editor={editor} />}
                    <div className={`rounded-md ${tab === 'write' ? 'border px-3 py-2 focus-within:ring-1 focus-within:ring-ring' : ''}`}>
                        <EditorContent editor={editor} />
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isSaving}>Cancel</Button>
                        <Button size="sm" onClick={() => save()} disabled={isSaving}>
                            {isSaving && <Loader2 className="animate-spin" />}
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-[1fr,auto] relative">
                    <div className="p-5 min-w-0">
                        {entry.content
                            ? <EditorContent editor={editor} />
                            : <p className="text-muted-foreground italic">No content yet.</p>
                        }
                    </div>
                    <div className="px-2 py-3 flex flex-col items-center gap-1 absolute top-0 right-0">
                        <div className="sticky top-4 flex flex-col gap-1">
                            <button onClick={() => togglePin()} title={entry.isPinned ? 'Unpin' : 'Pin'}
                                className={`group/pin p-1.5 rounded transition-colors hover:bg-muted ${entry.isPinned ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                                {entry.isPinned ? (
                                    <>
                                        <Pin className="h-3.5 w-3.5 fill-current group-hover/pin:hidden" />
                                        <PinOff className="h-3.5 w-3.5 hidden group-hover/pin:block" />
                                    </>
                                ) : (
                                    <Pin className="h-3.5 w-3.5" />
                                )}
                            </button>
                            {isDM && (
                                <button onClick={enterEdit} title="Edit"
                                    className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <Pencil className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
