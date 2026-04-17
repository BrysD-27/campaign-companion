import { useAuth } from '@/context/auth-context'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

function VerifyEmailPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { login } = useAuth()

    useEffect(() => {
        const success = searchParams.get('success')
        const token = searchParams.get('token')

        if (success === 'true' && token) {
            login({
                token,
                userId: Number(searchParams.get('userId')),
                username: searchParams.get('username') ?? '',
                email: searchParams.get('email') ?? ''
            })
            toast.success('Email verified! Welcome to Campaign Companion.')
            navigate('/', { replace: true })
        }
    }, [])

    return null
}

export default VerifyEmailPage
