import axios from 'axios'

export const getRemoteTodoList = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos')
    return result
}