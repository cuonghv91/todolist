import React from 'react'
import { ControlTabProps } from 'interfaces'

const ControlTab: React.FC<ControlTabProps> = ({
    isHavingCompletedTask = false,
    itemLeft = 0,
    activeControlTab = 'all',
    onFilterAll,
    onFilterActive,
    onFilterCompleted,
    onClearCompleted
}) => {

    const onHandleClickAllBtn = () => {
        onFilterAll && onFilterAll()
    }

    const onHandleClickActiveBtn = () => {
        onFilterActive && onFilterActive()
    }

    const onHandleClickCompletedBtn = () => {
        onFilterCompleted && onFilterCompleted()
    }

    const onHandleClickClearCompletedBtn = () => {
        onClearCompleted && onClearCompleted()
    }

    return (
        <div className="flex justify-between aligns-center border border-gray-200 p-2">
            <div data-testid="item-left">
                {itemLeft} item left
            </div>
            <div className="flex justify-center aligns-center">
                <div onClick={onHandleClickAllBtn} className={`mx-2 px-2 ${activeControlTab === 'all' ? 'border border-gray-200' : ''}`} data-testid="all-items">
                    <button>All</button>
                </div>
                <div onClick={onHandleClickActiveBtn} className={`mx-2 px-2 ${activeControlTab === 'active' ? 'border border-gray-200' : ''}`} data-testid="active-items">
                    <button>Active</button>
                </div>
                <div onClick={onHandleClickCompletedBtn} className={`mx-2 px-2 ${activeControlTab === 'completed' ? 'border border-gray-200' : ''}`} data-testid="complete-items">
                    <button>Completed</button>
                </div>
            </div>
            <div onClick={onHandleClickClearCompletedBtn} className={`${!isHavingCompletedTask ? '' : 'hidden'}`} data-testid="clear-complete-items">
                <button>Clear completed</button>
            </div>
        </div>
    )
}

export default ControlTab