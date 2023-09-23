import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdote";


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdotes(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const addVote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer