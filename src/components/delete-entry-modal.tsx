import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'

interface DeleteEntryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    isPending: boolean
}

export function DeleteEntryModal({ open, onOpenChange, onConfirm, isPending }: DeleteEntryModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete entry</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-2">
                    <p className="text-sm">Are you sure you want to delete this entry?</p>
                    <p className="text-sm text-muted-foreground">This cannot be undone.</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
