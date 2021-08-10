import React from 'react'
import { DropdownCaret, ClearText } from 'components/icons'
import styles from './index.module.css'

interface IEnterBox {
    onSubmitTask?: (content: string) => void,
    onCheckAllTask?: () => void,
}

const EnterBox: React.FC<IEnterBox> = ({
    onSubmitTask,
    onCheckAllTask
}) => {
    const [toggleClearText, setToggleClearText] = React.useState(false)
    const [inputVal, setInputVal] = React.useState('')

    const onHandleClickCheckAll = () => {
        onCheckAllTask && onCheckAllTask()
    }

    const onHandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(event.target.value)
        setToggleClearText(event.target.value.length !== 0)
    }

    const onHandleClickClearTextIcon = () => {
        setInputVal('')
        setToggleClearText(false)
    }

    const onHandleSubmitForm = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (inputVal.length !== 0) {
            onSubmitTask && onSubmitTask(inputVal);
            setInputVal('')
            setToggleClearText(false)
        }
    }

    return (
        <form data-testid="form" onSubmit={onHandleSubmitForm}>
            <div className="border border-gray-200 h-10 flex justify-between items-center rounded-sm">
                <button type="button" onClick={onHandleClickCheckAll} className={`flex justify-center items-center h-full relative ${styles.drop}`} data-testid="toggle-btn">
                    <DropdownCaret height="20px" styles={{
                        position: 'relative',
                        top: '-2px'
                    }} />
                </button>
                <div className={`relative h-full ${styles.input}`}>
                    <input className="h-full w-full outline-none" placeholder="What needs to be done ?" value={inputVal} onChange={onHandleInputChange} type="text" data-testid="input" />
                    <div onClick={onHandleClickClearTextIcon} className={`${!toggleClearText ? 'hidden' : ''} absolute right-2 cursor-pointer`} data-testid="clear-text">
                        <ClearText styles={{
                            position: 'relative',
                            top: '-29px'
                        }} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EnterBox