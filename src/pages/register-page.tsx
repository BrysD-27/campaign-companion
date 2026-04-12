import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { useLoading } from '@/hooks/use-loading'
import { api } from '@/lib/api'
import type { AuthResponse } from '@/types/auth'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const RegisterPage = () => {
    const { login, token, isLoading } = useAuth();
    const { setLoading } = useLoading();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ?? '/';

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            navigate(redirect, { replace: true });
        }

        setLoading(isLoading);
    }, [isLoading]);

    const handleRegister = async () => {
        setError(null)
        setLoading(true)
        try {
            const data = await api.post<AuthResponse>('/auth/register', { email, password })
            login(data)
            navigate(redirect, { replace: true })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleRegister()
    }

    return (
        <div className='h-150 flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Enter an email and password below to sign up
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}
                </CardContent>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
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
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={handleKeyDown} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full"
                        onClick={handleRegister}
                        disabled={isLoading || !email || !password || !username}>
                        Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterPage