import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError : (error) => {
      dispatch({ type: 'ERROR', text: error })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    if (content.length <= 5)
      return dispatch({ type: 'ERROR', text: 'Too short, min length is 5'});
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'CREATE', text: content })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote'  />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
