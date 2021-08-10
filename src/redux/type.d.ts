
interface ITask {
    id: number
    content: string,
    completed: boolean
}

type TaskAction = {
    type: string
    task: ITask
}

type SingleTaskAction = {
    type: string
    id: number
}

type MultipleTaskAction = {
    type: string
    id: number[]
}

type TaskState = {
    tasks: ITask[]
}

type AddMultipleTasksAction = {
    type: string
    tasks: ITask[]
}

type NoDataAction = {
    type: string
}


type DispatchType = (args: TaskAction | SingleTaskAction) => TaskAction | SingleTaskAction | MultipleTaskAction | AddMultipleTasksAction | NoDataAction