import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAllItems, toggleAllItems } from '../redux/actions';
import { RootState } from '../redux/store';
import { TodoItemType } from '../redux/types';
import NewItemForm from './NewItemForm';
import TodoItem from './TodoItem';

const TodoList: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const items: TodoItemType[] = useSelector(
        (state: RootState) => state.todoList.items
    );

    function dispatchDeleteAllItemsAction() {
        dispatch(deleteAllItems());
    }

    function dispatchToggleAllItemsAction() {
        dispatch(toggleAllItems());
    }

    const toggleAllItemsButton: JSX.Element = (
        <input
            type="checkbox"
            id="toggle-all-items-button"
            onClick={dispatchToggleAllItemsAction}
        />
    );

    const todoItemJSXElements: JSX.Element[] = items.map(item => {
        return (
            <TodoItem
                name={item.name}
                done={item.done}
                id={item.id}
                key={item.id}
                createdOn={item.createdOn}
                doneOn={item.doneOn}
                updatedOn={item.updatedOn}
            />
        );
    });

    return (
        <div className="content-div">
            <div className="create-item-div">
                {items.length > 0 && toggleAllItemsButton}
                <NewItemForm />
            </div>
            <div className="item-list-div">
                <br />
                <ul>{todoItemJSXElements}</ul>
            </div>
            <button
                id="delete-all-items-button"
                onClick={dispatchDeleteAllItemsAction}
            >
                DELETE ALL
            </button>
        </div>
    );
};

export default TodoList;
