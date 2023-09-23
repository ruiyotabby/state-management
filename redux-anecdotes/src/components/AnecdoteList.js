import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })
  const dispatch = useDispatch()

  const handleClick = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3000))
  }

  return (
    anecdotes.toSorted((a, b) => a.votes < b.votes).map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleClick(anecdote)}
      />
    )
  )
}

export default AnecdoteList