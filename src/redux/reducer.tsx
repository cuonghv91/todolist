import * as actionTypes from "./actionTypes"
import { saveListToLocal } from 'services/localstorage'
import { LIST_LOCALSTORAGE_NAME } from 'constants/index'

const initialState: TaskState = {
    tasks: [],
}

const reducer = (
    state: TaskState = initialState,
    action: TaskAction | SingleTaskAction | MultipleTaskAction | AddMultipleTasksAction | NoDataAction
): TaskState => {
    switch (action.type) {
        case actionTypes.ADD_TASK: {
            const newTask: ITask = {
                id: (action as TaskAction).task.id,
                content: (action as TaskAction).task.content,
                completed: (action as TaskAction).task.completed
            }
            saveListToLocal(state.tasks.concat(newTask))
            return {
                ...state,
                tasks: state.tasks.concat(newTask),
            }
        }

        case actionTypes.ADD_MULTIPLE_TASK: {
            saveListToLocal(state.tasks.concat((action as AddMultipleTasksAction).tasks))
            return {
                ...state,
                tasks: state.tasks.concat((action as AddMultipleTasksAction).tasks),
            }
        }

        case actionTypes.COMPLETE_TASK: {
            const updatedTasks = JSON.parse(JSON.stringify(state.tasks))
            updatedTasks.forEach((task: ITask, index: number) => {
                if (task.id === (action as SingleTaskAction).id) {
                    updatedTasks[index].completed = !updatedTasks[index].completed
                }
            })

            saveListToLocal(updatedTasks)

            return {
                ...state,
                tasks: updatedTasks,
            }
        }

        case actionTypes.REMOVE_ONE_TASK: {
            const updatedTasks = JSON.parse(JSON.stringify(state.tasks)).filter((task: ITask) => task.id !== (action as SingleTaskAction).id)
            saveListToLocal(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks,
            }
        }

        case actionTypes.REMOVE_MULTIPLE_TASK: {
            const updatedTasks = JSON.parse(JSON.stringify(state.tasks)).filter((task: ITask) => (action as MultipleTaskAction).id.indexOf(task.id) === -1)
            saveListToLocal(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks,
            }
        }

        case actionTypes.TOGGLE_ALL: {
            const updatedTasks = JSON.parse(JSON.stringify(state.tasks)).map((task: ITask) => {
                if (JSON.parse(JSON.stringify(state.tasks)).filter((task: ITask) => task.completed === true).length === JSON.parse(JSON.stringify(state.tasks)).length) {
                    return { ...task, completed: false }

                } else {
                    return { ...task, completed: true }
                }
            })
            console.log(111, updatedTasks)
            saveListToLocal(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks,
            }
        }
    }

    return state
}

export default reducer