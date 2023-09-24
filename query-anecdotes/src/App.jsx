import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll } from './requests'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Loading data...</div>
  }
  if (result.isError && result.error.message === 'Network Error') {
    return <div>Anecdotes service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
