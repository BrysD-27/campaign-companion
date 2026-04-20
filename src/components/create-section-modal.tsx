import type { CreateSectionRequest } from "@/types/sections";
import { BookOpen, Calendar, Castle, Compass, Crown, Flame, Flag, Gem, Globe, type LucideIcon, Loader2, Map, MessageSquare, Package, ScrollText, Shield, Skull, Star, Swords, TreePine, Users, Zap, ShieldUser } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

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

interface CreateSectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (request: CreateSectionRequest) => void;
    parentSectionId: number | null;
    isPending: boolean;
}

export function CreateSectionModal({ open, onOpenChange, onSubmit, isPending, parentSectionId }: CreateSectionModalProps) {
    const [title, setTitle] = useState('');
    const [isDmOnly, setIsDmOnly] = useState(false);
    const [icon, setIcon] = useState<string | null>(null);

    const handleSubmit = () => {
        if (!title.trim()) return;
        onSubmit({ title, isDmOnly, sortOrder: 0, ...(icon ? { icon } : {}) });
        setTitle('');
        setIcon('');
        setIsDmOnly(false);
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) { setTitle(''); setIsDmOnly(false); setIcon(null); } onOpenChange(v); }}>
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

                    {parentSectionId === null && (
                        <div className="space-y-2">
                            <Label>Icon</Label>
                            <div className="grid grid-cols-5 gap-1">
                                {SECTION_ICONS.map(({ name, icon: IconComponent }) => (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => setIcon(icon === name ? null : name)}
                                        className={cn(
                                            "rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground flex justify-center",
                                            icon === name && "bg-accent text-accent-foreground ring-1 ring-ring"
                                        )}
                                    >
                                        <IconComponent className="size-4" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

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