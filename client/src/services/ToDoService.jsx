import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000/api'
})

function getAllToDos() {
    return http.get('/ToDos')
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function getOneToDo(id) {
    return http.get(`/ToDos/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function updateOneToDo(id, toDoState) {
    return http.put(`/ToDos/${id}`, toDoState)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function patchOneToDo(id, toDoState) {
    return http.patch(`/ToDos/${id}`, toDoState)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

function addOneToDo(ToDo) {
    return http.post('/ToDos/add', ToDo)
        .then(res => res.data)
        .catch(err => {
            throw err; 
        })
}

function deleteOneToDo(id) {
    return http.delete(`/ToDos/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}

const ToDoService = {
    getAllToDos: getAllToDos,
    updateOneToDo: updateOneToDo,
    addOneToDo: addOneToDo,
    getOneToDo: getOneToDo,
    deleteOneToDo: deleteOneToDo,
    patchOneToDo: patchOneToDo
}

export default ToDoService