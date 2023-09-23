import { useDispatch } from "react-redux"
import { addFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    const filter = event.target.value

    dispatch(addFilter(filter))
  }

  return(
    <div style={style}>
      filter
      <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter