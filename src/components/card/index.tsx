import React from 'react'
import { CardProps } from 'interfaces'
import { ClearText } from 'components/icons'
import styles from './index.module.css'

const Card: React.FC<CardProps> = ({
    description,
    isChecked = false,
    onToggleCheck,
    onRemove,
    id
}) => {

    const onHandleCheckboxChange = () => {
    }

    const onHandleCardClick = () => {
        id && onToggleCheck && onToggleCheck(id)
    }

    const onHandleRemoveCard = () => {
        id && onRemove && onRemove(id)
    }

    return (
        <div className="group hover:bg-purple-100 flex border border-gray-200 justify-between aligns-center py-2">
            <div onClick={onHandleCardClick} className={`flex px-2 cursor-pointer justify-start aligns-center ${styles.content}`}>
                <div className={`${styles.checkbox} relative`} data-testid="checkbox">
                    <input checked={isChecked} onChange={onHandleCheckboxChange} type="checkbox" data-testid="checkbox-input" />
                </div>
                <div className={`pl-2 ${isChecked ? 'line-through' : ''}`} data-testid="description">{description}</div>
            </div>
            <div onClick={onHandleRemoveCard} className={`${styles.icon} flex justify-center aligns-center hidden group-hover:flex`} data-testid="remove-icon">
                <ClearText />
            </div>
        </div>
    )
}

export default Card