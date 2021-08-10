import { LIST_LOCALSTORAGE_NAME } from 'constants/index'

export const saveListToLocal = (list: any) => {
    window.localStorage.setItem(LIST_LOCALSTORAGE_NAME, JSON.stringify(list));
}