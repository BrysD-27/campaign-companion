import type { CreateSectionRequest } from "@/types/sections";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface CreateSectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (request: CreateSectionRequest) => void;
    isPending: boolean;
}

export function CreateSectionModal({ open, onOpenChange, onSubmit, isPending }: CreateSectionModalProps) {
    const [title, setTitle] = useState('');
    const [isDmOnly, setIsDmOnly] = useState(false);

    const handleSubmit = () => {
        if (!title.trim()) return;
        onSubmit({ title, isDmOnly, sortOrder: 0 });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add section</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Factions, Locations, NPCs"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                            <p className="text-sm">DM only</p>
                            <p className="text-xs text-muted-foreground">Hidden from all players</p>
                        </div>
                        <Switch checked={isDmOnly} onCheckedChange={setIsDmOnly} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isPending || !title.trim()}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Create section
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}