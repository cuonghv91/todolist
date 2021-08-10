import * as actionTypes from "./actionTypes"

export function addTask(task: ITask) {
    const action: TaskAction = {
        type: actionTypes.ADD_TASK,
        task,
    }

    return action
}

export function addMultipleTask(tasks: ITask[]) {
    const action: AddMultipleTasksAction = {
        type: actionTypes.ADD_MULTIPLE_TASK,
        tasks,
    }

    return action
}

export function completeTask(id: number) {
    const action: SingleTaskAction = {
        type: actionTypes.COMPLETE_TASK,
        id,
    }

    return action
}

export function removeOneTask(id: number) {
    const action: SingleTaskAction = {
        type: actionTypes.REMOVE_ONE_TASK,
        id,
    }

    return action
}

export function removeMultipleTask(id: number[]) {
    const action: MultipleTaskAction = {
        type: actionTypes.REMOVE_MULTIPLE_TASK,
        id,
    }

    return action
}

export function toggleAll() {
    const action: NoDataAction = {
        type: actionTypes.TOGGLE_ALL,
    }

    return action
}