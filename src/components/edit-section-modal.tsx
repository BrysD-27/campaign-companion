import { cn } from "@/lib/utils";
import type { SectionResponse, UpdateSectionRequest } from "@/types/sections";
import { BookOpen, Calendar, Castle, Compass, Crown, Flame, Flag, Gem, Globe, type LucideIcon, Loader2, Map, MessageSquare, Package, ScrollText, Shield, Skull, Star, Swords, TreePine, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SECTION_ICONS: { name: string; icon: LucideIcon }[] = [
    { name: 'Map', icon: Map },
    { name: 'Swords', icon: Swords },
    { name: 'Users', icon: Users },
    { name: 'BookOpen', icon: BookOpen },
    { name: 'ScrollText', icon: ScrollText },
    { name: 'Castle', icon: Castle },
    { name: 'Skull', icon: Skull },
    { name: 'Crown', icon: Crown },
    { name: 'Gem', icon: Gem },
    { name: 'Flame', icon: Flame },
    { name: 'Star', icon: Star },
    { name: 'Shield', icon: Shield },
    { name: 'Globe', icon: Globe },
    { name: 'TreePine', icon: TreePine },
    { name: 'Package', icon: Package },
    { name: 'Calendar', icon: Calendar },
    { name: 'Flag', icon: Flag },
    { name: 'Compass', icon: Compass },
    { name: 'Zap', icon: Zap },
    { name: 'MessageSquare', icon: MessageSquare },
];

interface EditSectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (request: UpdateSectionRequest) => void;
    section: SectionResponse;
    isPending: boolean;
}

export function EditSectionModal({ open, onOpenChange, onSubmit, section, isPending }: EditSectionModalProps) {
    const [title, setTitle] = useState(section.title);
    const [icon, setIcon] = useState<string | null>(section.icon);

    const handleSubmit = () => {
        if (!title.trim()) return;
        onSubmit({ title, ...(icon ? { icon } : {}) });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) { setTitle(section.title); setIcon(section.icon); } onOpenChange(v); }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit section</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Icon</Label>
                        <div className="grid grid-cols-5 gap-1">
                            {SECTION_ICONS.map(({ name, icon: IconComponent }) => (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setIcon(icon === name ? null : name)}
                                    className={cn(
                                        "rounded-md p-2 transition-colors hover:text-accent-foreground flex justify-center",
                                        icon === name && "text-accent-foreground ring-1 ring-ring"
                                    )}
                                >
                                    <IconComponent className="size-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isPending || !title.trim()}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
