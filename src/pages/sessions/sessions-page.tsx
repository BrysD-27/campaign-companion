import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/auth-context'
import { api } from '@/lib/api'

const SessionsPage = () => {
  const { campaignId } = useParams()
  const { token }      = useAuth()

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions', campaignId],
    queryFn:  () => api.get<any[]>(`/campaigns/${campaignId}/sessions`, token!)
  })

  return (
    <div className="p-6">
      <h1>Sessions</h1>
      {isLoading && <p>Loading...</p>}
      {sessions?.map((session: any) => (
        <div key={session.sessionId}>
          {session.title}
        </div>
      ))}
    </div>
  )
}

export default SessionsPage
