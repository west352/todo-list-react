import React from 'react';

import TodoList from './components/TodoList';

const App: React.FC = (): JSX.Element => {
    const header = (
        <div className="title-div">
            <span className="title">
                <a href="#">Todo List</a>
            </span>
            <span className="author">
                <a
                    href="https://github.com/west352"
                    target="_blank"
                    rel="noreferrer"
                >
                    &nbsp; West Liu &nbsp;
                </a>
            </span>
        </div>
    );
    return (
        <div className="app-container">
            {header}
            <TodoList />
        </div>
    );
};

export default App;
