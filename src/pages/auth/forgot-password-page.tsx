import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [sent, setSent] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (email: string) =>
            api.post<{ message: string }>('/auth/forgot-password', { email }),
        onSuccess: (data: { message: string }) => {
            setMessage(data.message);
            setSent(true);
        },
        onError: () => setError('Error sending reset link')
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') console.log('')
    }

    return (
        <div className='h-150 flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Forgot Password?</CardTitle>
                    <CardDescription>
                        Enter your email and we'll send you a reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardContent>
                    <Label className="text-muted-foreground">{message && message}</Label>
                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full"
                        onClick={() => mutate(email)}
                        disabled={!email || isPending || sent}>
                        {isPending && <Loader2 className="animate-spin" />}
                        {isPending ? "Sending..." : sent ? "Sent" : "Send Reset Link"}
                    </Button>
                    <hr className="w-full border-border my-1"/>
                    <Button variant={"outline"} type="submit" className="w-full"
                        onClick={() => navigate('/login', { replace: true })}
                        >
                        Return to Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
