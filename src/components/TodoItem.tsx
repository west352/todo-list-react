import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteItem, toggleItem, updateItem } from '../redux/actions';
import { TodoItemType } from '../redux/types';
import TodoItemDetails from './TodoItemDetails';

type TodoItemProps = TodoItemType;
const TodoItem: React.FC<TodoItemProps> = (props: TodoItemProps): JSX.Element => {
    const dispatch = useDispatch();
    const [editingMode, setEditingMode] = useState(false);
    const [showItemDetails, setShowItemDetails] = useState(false);
    const [editedItemName, setEditedItemName] = useState(props.name);
    const [prevItemName, setPrevItemName] = useState(props.name);

    function quitEditingMode(): void {
        setEditingMode(false);
    }

    function dispatchToggleItemAction(): void {
        dispatch(toggleItem(props.id));
    }

    function dispatchUpdateItemAction(): void {
        dispatch(updateItem({ id: props.id, name: editedItemName }));
    }

    function dispatchDeleteItemAction(): void {
        dispatch(deleteItem(props.id));
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            if (editedItemName) {
                setPrevItemName(editedItemName);
                dispatchUpdateItemAction();
            } else {
                dispatchDeleteItemAction();
            }
            quitEditingMode();
        } else if (e.key === 'Escape') {
            setEditedItemName(prevItemName);
            quitEditingMode();
        }
    }

    function handleFocusOut(): void {
        if (editedItemName) {
            setPrevItemName(editedItemName);
            dispatchUpdateItemAction();
        } else {
            dispatchDeleteItemAction();
        }
        quitEditingMode();
    }

    function handleTyping(e: React.ChangeEvent<HTMLInputElement>): void {
        setEditedItemName(e.target.value);
    }

    function startTyping(): void {
        setEditingMode(true);
    }

    function toggleShowItemDetails(): void {
        setShowItemDetails(!showItemDetails);
    }

    const toggleItemCheckbox: JSX.Element = (
        <input
            type="checkbox"
            className="toggle-item-checkbox"
            onChange={dispatchToggleItemAction}
            checked={props.done}
        />
    );

    const updateItemInput: JSX.Element = (
        <input
            autoFocus
            type="text"
            className="update-item-input"
            onChange={handleTyping}
            onKeyUp={handleKeyUp}
            onBlur={handleFocusOut}
            value={editedItemName}
        />
    );

    const itemLabelClasses = classNames({
        'item-lable': true,
        'item-strikethrough': props.done,
    });

    const itemLabel = (
        <label onClick={startTyping} className={itemLabelClasses}>
            {editedItemName}
        </label>
    );

    const deleteItemButton: JSX.Element = (
        <button className="x-button" onClick={dispatchDeleteItemAction}>
            x
        </button>
    );

    const showItemDetailsButton: JSX.Element = (
        <button onClick={toggleShowItemDetails} className="show-item-details-button">
            ...
        </button>
    );

    if (editingMode) {
        return (
            <li>
                {toggleItemCheckbox}
                {updateItemInput}
                {deleteItemButton}
            </li>
        );
    } else {
        return (
            <React.Fragment>
                <li>
                    {toggleItemCheckbox}
                    {itemLabel}
                    {showItemDetailsButton}
                    {deleteItemButton}
                </li>
                {showItemDetails && (
                    <TodoItemDetails
                        done={props.done}
                        doneOn={props.doneOn}
                        updatedOn={props.updatedOn}
                        createdOn={props.createdOn}
                    />
                )}
            </React.Fragment>
        );
    }
};

export default TodoItem;
