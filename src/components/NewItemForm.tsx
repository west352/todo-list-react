import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../redux/actions';

const NewItemForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const [newItemName, setNewItemName] = useState('');
    const [typing, setTyping] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    function clearForm(): void {
        setNewItemName('');
        setTyping(false);
        if (formRef.current) {
            formRef.current.reset();
        }
    }

    // handle submit event for createItemForm element
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(addItem(newItemName));
        clearForm();
    }

    // handle focus event for the input element inside createItemForm element
    function handleFocus(): void {
        setTyping(true);
    }

    // handle change event for the input element inside createItemForm element
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewItemName(e.target.value);
    }

    // handle focusout event for the input element inside createItemForm element
    function handleFocusOut(): void {
        if (newItemName === '') {
            setTyping(false);
        }
    }

    return (
        <React.Fragment>
            <form id="create-item-form" onSubmit={handleSubmit} ref={formRef}>
                <input
                    id="create-item-input"
                    type="text"
                    placeholder="Add a new item"
                    onFocus={handleFocus}
                    onBlur={handleFocusOut}
                    onChange={handleChange}
                />
                {typing && (
                    <button type="submit" id="create-item-button">
                        +
                    </button>
                )}
            </form>
            <button id="clear-button" onClick={clearForm}>
                x
            </button>
        </React.Fragment>
    );
};

export default NewItemForm;
