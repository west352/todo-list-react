import { v4 as uuid } from 'uuid';

import {
    AddItemAction,
    DeleteItemAction,
    TodoItemType,
    TodoListAction,
    todoListActionTypes,
    TodoListState,
    ToggleAllItemsAction,
    ToggleItemAction,
    UpdateItemAction,
} from './types';

const now: Date = new Date();
const initialState: TodoListState = {
    items: [
        {
            name: 'This is a done item',
            done: true,
            id: uuid(),
            createdOn: now,
            doneOn: undefined,
            updatedOn: now,
        },
        {
            name: 'This is an undone item',
            done: false,
            id: uuid(),
            createdOn: now,
            doneOn: undefined,
            updatedOn: now,
        },
    ],
};

const reducers = (
    state: TodoListState = initialState,
    action: TodoListAction
): TodoListState => {
    switch (action.type) {
        case todoListActionTypes.ADD_ITEM: {
            const { name, id, createdOn } = (action as AddItemAction).payload;
            const newItem = {
                name: name,
                done: false,
                id: id,
                createdOn: createdOn,
                doneOn: undefined,
                updatedOn: createdOn,
            };
            return {
                items: [...state.items, newItem],
            };
        }

        case todoListActionTypes.DELETE_ITEM: {
            const { id } = (action as DeleteItemAction).payload;
            return {
                items: state.items.filter(item => item.id !== id),
            };
        }

        case todoListActionTypes.DELETE_ALL_ITEMS: {
            return { items: [] };
        }

        case todoListActionTypes.TOGGLE_ALL_ITEMS: {
            const { doneOn } = (action as ToggleAllItemsAction).payload;
            let numDoneItems = 0;
            const numOfItems = state.items.length;
            for (const item of state.items) {
                if (item.done) {
                    numDoneItems++;
                }
            }
            if (numDoneItems === numOfItems) {
                const toggledItems: TodoItemType[] = state.items.map(item => {
                    return { ...item, done: false, doneOn: undefined };
                });
                return {
                    items: toggledItems,
                };
            } else {
                const toggledItems: TodoItemType[] = state.items.map(item => {
                    if (item.done) {
                        return item;
                    } else return { ...item, done: true, doneOn: doneOn };
                });
                return { items: toggledItems };
            }
        }

        case todoListActionTypes.TOGGLE_ITEM: {
            const { id, doneOn } = (action as ToggleItemAction).payload;
            return {
                items: state.items.map(item => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        return {
                            ...item,
                            done: !item.done,
                            doneOn: item.done ? undefined : doneOn,
                        };
                    }
                }),
            };
        }

        case todoListActionTypes.UPDATE_ITEM: {
            const { id, name, updatedOn } = (action as UpdateItemAction).payload;
            const updatedList: TodoItemType[] = state.items.map(item => {
                if (item.id !== id) {
                    return item;
                } else {
                    return { ...item, name: name, updatedOn: updatedOn };
                }
            });
            return {
                items: updatedList,
            };
        }

        default: {
            return state;
        }
    }
};

export default reducers;
