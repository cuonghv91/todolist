export interface IconProps {
    width?: string,
    height?: string,
    styles?: any
}

export interface CardProps {
    description?: string,
    isChecked?: boolean,
    onToggleCheck?: (id: number) => void,
    onRemove?: (id: number) => void,
    id?: number
}

export interface ControlTabProps {
    isHavingCompletedTask?: boolean,
    itemLeft?: number,
    activeControlTab?: string,
    onFilterAll?: () => void,
    onFilterActive?: () => void,
    onFilterCompleted?: () => void,
    onClearCompleted?: () => void,
}

export interface IRemoteItem {
    id: number,
    title: string,
    completed: boolean,
    userId: number
}