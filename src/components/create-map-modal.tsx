import type { CreateMapRequest } from '@/types/maps';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface CreateMapModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (request: CreateMapRequest) => void;
    isPending: boolean;
}

export function CreateMapModal({ open, onOpenChange, onSubmit, isPending }: CreateMapModalProps) {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isDmOnly, setIsDmOnly] = useState(true);

    const reset = () => { setTitle(''); setImageUrl(''); setIsDmOnly(true); };

    const handleSubmit = () => {
        if (!title.trim() || !imageUrl.trim()) return;
        onSubmit({ title: title.trim(), imageUrl: imageUrl.trim(), isDmOnly });
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add map</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="map-title">Title</Label>
                        <Input
                            id="map-title"
                            placeholder="e.g. World Map, Dungeon Level 1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="map-url">Image URL</Label>
                        <Input
                            id="map-url"
                            placeholder="https://example.com/map.png"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={isPending || !title.trim() || !imageUrl.trim()}>
                        {isPending && <Loader2 className="animate-spin" />}
                        Add map
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
