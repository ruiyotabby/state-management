import { createContext, useContext, useReducer } from "react"
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `anecdote '${action.text}' created`
    case 'VOTE':
      return `anecdote '${action.text}' voted`
    case 'ERROR':
      return action.text
    case 'RESET':
      return ''
    default:
      return Error('Uknown action: ', action.type)
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      { props.children }
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

NotificationContextProvider.propTypes = {
  children: PropTypes.any
}

export default NotificationContext