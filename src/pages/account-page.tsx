import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AccountPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
            <Button variant={"outline"} onClick={() => navigate(-1)}>
                <ChevronLeft />
                Back</Button>
            <h1 className="text-2xl font-medium">Account</h1>
            {/* Profile */}
            <section className="border border-border rounded-lg p-5 space-y-4">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Profile</h2>

                <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="" />
                        <AvatarFallback>BD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-medium">Bryson Davis</p>
                        <p className="text-sm text-muted-foreground">Member since January 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Change avatar</Button>
                </div>

                <AccountRow label="Username" value={user?.username} />
                <Separator />
                <AccountRow label="Display name" value={user?.profile?.displayName ? user.profile.displayName : 'N/A'} />
                <Separator />
                <AccountRow
                    label="Email"
                    value={
                        <span className="flex items-center gap-2 flex-wrap">
                            <span className="text-wrap break-all">
                                {user?.email}
                            </span>
                            <Badge variant="secondary">Verified</Badge>
                        </span>
                    }
                />
                <Separator />
                <AccountRow label="Bio" value={user?.profile?.bio} />
            </section>

            {/* Security */}
            <section className="border border-border rounded-lg p-5 space-y-4">
                <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Security</h2>
                <AccountRow label="Password" value={user?.passwordLastChangedAt} />
            </section>

            {/* Danger Zone */}
            <section className="border border-destructive rounded-lg p-5">
                <h2 className="text-xs font-medium uppercase tracking-wide text-destructive mb-4">Danger zone</h2>
                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all campaigns you own. This cannot be undone.
                    </p>
                    <Button variant="destructive" size="sm" className="shrink-0">
                        Delete account
                    </Button>
                </div>
            </section>
        </div>
    )
}

interface AccountRowProps {
    label: string;
    value: React.ReactNode;
    onEdit?: () => void;
}
function AccountRow({ label, value, onEdit }: AccountRowProps) {
    return (
        <>
            <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground w-28 shrink-0">{label}</span>
                <span className="text-sm flex-1 px-3">{value}</span>
                <Button variant="ghost" size="sm" onClick={onEdit}>
                    Edit
                </Button>
            </div>
        </>
    );
}

export default AccountPage;
