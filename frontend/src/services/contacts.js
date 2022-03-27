import axios from 'axios'
const baseUrl ='http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = id => {
    const url = baseUrl + '/' + id;
    console.log(url)
    return axios.delete(url)
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    remove: remove
  }