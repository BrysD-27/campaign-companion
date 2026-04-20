import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'
import { useLoading } from '@/hooks/use-loading'
import { api } from '@/lib/api'
import type { AuthResponse } from '@/types/auth'
import { GoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const LoginPage = () => {
    const { login, token, isLoading } = useAuth();
    const { setLoading } = useLoading();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ?? '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [unverified, setUnverified] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            navigate(redirect, { replace: true });
        }
        setLoading(isLoading);
    }, [isLoading]);

    const handleLogin = async () => {
        setError(null)
        setLoading(true)
        try {
            const data = await api.post<AuthResponse>('/auth/login', { email, password })
            login(data)
            navigate(redirect, { replace: true })
        } catch (err: any) {
            setError(err.message)
            if (err.message?.toLowerCase().includes('verified')) {
                setUnverified(err.email);
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setError(null)
        try {
            const data = await api.post<AuthResponse>('/auth/google', {
                idToken: credentialResponse.credential
            })
            login(data)
            navigate(redirect, { replace: true })
        } catch (err: any) {
            setError(err.message);
            if (err.email) {
                setUnverified(err.email);
            }
        }
    }

    const handleVerificationLinkSend = async (email: string) => {
        setError(null)
        setLoading(true)
        try {
            await api.post<string>('/auth/resend-verification', email);
            toast.success('Email verification link sent.')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
            setUnverified(null);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin()
    }

    const handleRegisterLink = () => {
        navigate('/register');
    }

    return (
        <div className='h-150 flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={handleRegisterLink} className='cursor-pointer'>Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent className='text-sm text-destructive'>
                    {error && (
                        <p>{error}</p>
                    )}
                    {
                        unverified &&
                        <Button variant="link" onClick={() => handleVerificationLinkSend(unverified)} className='cursor-pointer p-0'>Send Verification Link</Button>
                    }
                </CardContent>
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
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                                        onClick={() => navigate('/forgot-password', { replace: true })}
                                    >
                                        Forgot your password?
                                    </a>
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
                        onClick={handleLogin}
                        disabled={isLoading || !email || !password}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full p-0 relative">
                        <img src="https://developers.google.com/identity/images/g-logo.png" className="w-4 h-4 mr-2" />
                        Login with Google
                        <GoogleLogin onSuccess={handleGoogleSuccess} containerProps={{
                            style: {
                                opacity: 0,
                                width: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1000,
                            },
                        }} />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage
