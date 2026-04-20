import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface DeleteSectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isPending: boolean;
    sectionTitle: string;
}

export function DeleteSectionModal({ open, onOpenChange, onConfirm, isPending, sectionTitle }: DeleteSectionModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete section</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-2">
                    <p className="text-sm">Are you sure you want to delete <span className="font-medium">{sectionTitle}</span>?</p>
                    <p className="text-sm text-muted-foreground">This will permanently delete all sub-sections and entries within this section.</p>
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
    );
}
