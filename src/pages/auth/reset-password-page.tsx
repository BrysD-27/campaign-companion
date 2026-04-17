import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (password !== confirm) {
            toast.error('Passwords do not match.')
            return
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters.')
            return
        }

        setIsLoading(true)
        try {
            await api.post('/auth/reset-password', { token, password })
            toast.success('Password reset successfully.')
            navigate('/login')
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <Card className='w-full max-w-sm'>
                    <CardHeader>
                        <CardTitle>Invalid link</CardTitle>
                        <CardDescription>This reset link is invalid or has expired.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                    <CardDescription>Enter a new password for your account.</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='password'>New password</Label>
                        <Input
                            id='password'
                            type='password'
                            placeholder='••••••••'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='confirm'>Confirm password</Label>
                        <Input
                            id='confirm'
                            type='password'
                            placeholder='••••••••'
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full' onClick={handleSubmit} disabled={!password || !confirm || isLoading}>
                        Reset password
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ResetPasswordPage;
