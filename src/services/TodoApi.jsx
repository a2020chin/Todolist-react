import axios from "axios"
import { useAuth } from "../components/Context"

const { token } = useAuth()
const _url = 'https://todoo.5xcamp.us/todos'

export const getTodo = (data) => {
  return axios.get({
    header: {
      Accept: 'application/json',
      Authorization: token
    },
    method: 'get',
    url: _url,
    data
  })
}


// export default TodoApi