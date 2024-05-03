import { Router } from "express"
import ToDoController from "../controllers/toDo.controller.js"
const ToDoRouter = Router()

// Create new ToDo
ToDoRouter.route('/toDos/add')
    .post(ToDoController.createToDo)

// Get all trades
ToDoRouter.route('/toDos')
    .get(ToDoController.getAllToDos)

ToDoRouter.route('/toDos/:id')
    .get(ToDoController.getOneToDo)
    .put(ToDoController.editToDo)
    .patch(ToDoController.editToDo)
    .delete(ToDoController.deleteOneToDo)

export default ToDoRouter