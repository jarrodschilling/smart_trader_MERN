import ToDo from "../models/toDo.model.js"

async function createToDo(req, res) {
    try {
        const newToDo = await ToDo.create(req.body)
        const toDo = await newToDo.save()
        res.json(newToDo)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function getAllToDos(req, res) {
    try {
        const allToDos = await ToDo.find()
        res.json(allToDos)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

async function getOneToDo(req, res) {
    try {
        const oneToDo = await ToDo.findById(req.params.id)
        res.json(oneToDo)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


async function editToDo(req, res) {
    const options = {
        new: true,
        runValidators: true
    }
    try {
        const updatedToDo = await ToDo.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatedToDo)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// async function patchToDo(req, res) {
//     const options = {
//         new: true,
//         runValidators: true
//     }
//     try {
//         const updatedToDo = await ToDo.findByIdAndUpdate(req.params.id, req.body, options)
//         res.json(updatedToDo)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// }

async function deleteOneToDo(req, res) {
    try {
        const deleteToDo = await ToDo.findByIdAndDelete(req.params.id)
        res.json(deleteToDo)
    }  catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const ToDoController = {
    createToDo: createToDo,
    getAllToDos: getAllToDos,
    getOneToDo: getOneToDo,
    editToDo: editToDo,
    deleteOneToDo: deleteOneToDo,
}

export default ToDoController