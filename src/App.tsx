import React from 'react'
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { addTask, completeTask, removeOneTask, removeMultipleTask, addMultipleTask, toggleAll } from "redux/actionCreators"
import { Dispatch } from "redux"
import axios from 'axios';

import EnterBox from 'components/enter-box'
import ControlTab from 'components/control-tab'
import Card from 'components/card'
import { getRemoteTodoList } from 'services/http'
import { saveListToLocal } from 'services/localstorage'
import { IRemoteItem } from 'interfaces'
import { LIST_LOCALSTORAGE_NAME } from 'constants/index'


const App: React.FC = () => {
  const tasks: ITask[] = useSelector((state: TaskState) => state.tasks)
  const dispatch: Dispatch<any> = useDispatch()

  const [activeControlTab, setActiveControlTab] = React.useState('all')
  const [internalTask, setInternalTask] = React.useState(tasks)

  React.useEffect(() => {
    setInternalTask(tasks)
  }, [tasks])

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem(LIST_LOCALSTORAGE_NAME) as string)) {
      const defaultTodoList = JSON.parse(localStorage.getItem(LIST_LOCALSTORAGE_NAME) as string)
      dispatch(addMultipleTask(defaultTodoList))
    } else {
      getRemoteTodoList()
        .then(result => {
          const defaultTodoList = result.data.slice(0, 10).map((item: IRemoteItem) => {
            return {
              id: item.id,
              content: item.title,
              completed: item.completed
            }
          })
          saveListToLocal(defaultTodoList)
          dispatch(addMultipleTask(defaultTodoList))
        })
    }
  }, [])

  const onSubmitAddTask = React.useCallback((content: string) => dispatch(addTask({ id: Date.now(), content, completed: false })), [dispatch])

  const onHandleToggleCheck = React.useCallback((id: number) => {
    dispatch(completeTask(id))
  }, [dispatch])

  const onHandleRemoveOneTask = React.useCallback((id: number) => {
    dispatch(removeOneTask(id))
  }, [dispatch])

  const onHandleRemoveMultipleTask = React.useCallback((id: number[]) => {
    dispatch(removeMultipleTask(id))
    setActiveControlTab('all')
  }, [dispatch])

  const onHandleFilterAll = (tasks: ITask[]) => {
    setActiveControlTab('all')
    setInternalTask(tasks)
  }

  const onHandleFilterActive = (tasks: ITask[]) => {
    setActiveControlTab('active')
    setInternalTask(tasks.filter((task: ITask) => task.completed === false))
  }

  const onHandleFilterCompleted = (tasks: ITask[]) => {
    setActiveControlTab('completed')
    setInternalTask(tasks.filter((task: ITask) => task.completed === true))
  }

  const onHandleCheckAllTasks = () => {
    dispatch(toggleAll())
  }



  return (
    <div className="w-1/2 m-auto mt-8">
      <EnterBox onSubmitTask={(content: string) => onSubmitAddTask(content)} onCheckAllTask={onHandleCheckAllTasks} />
      {internalTask.map((task: ITask) => <Card
        key={task.id}
        id={task.id}
        description={task.content}
        isChecked={task.completed}
        onToggleCheck={onHandleToggleCheck}
        onRemove={onHandleRemoveOneTask}
      />)}
      {(internalTask.length !== 0 || tasks.length !== 0) && <ControlTab
        itemLeft={internalTask.filter((task: ITask) => task.completed === false).length}
        isHavingCompletedTask={internalTask.filter((task: ITask) => task.completed === true).length == 0}
        onClearCompleted={() => onHandleRemoveMultipleTask(internalTask.filter((task: ITask) => task.completed === true).map((task: ITask) => task.id))}
        activeControlTab={activeControlTab}
        onFilterAll={() => onHandleFilterAll(tasks)}
        onFilterActive={() => onHandleFilterActive(tasks)}
        onFilterCompleted={() => onHandleFilterCompleted(tasks)}
      />}
    </div>
  )
}

export default App