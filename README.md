## Todo-list Application
The main purpose of making the project is to practice using React, Redux, and TypeScript to build a basic front-end application.  
It could be used as a temporary todo-list reminder.  
There is another version of this application built by vanilla JavaScript available in my github repository.  

### Features
- Add a todo item into the list of todo-items.
- Toggle a todo item if it is finished. The finished todo item will be shown in grey color and crossed out with a line.
- Toggle all the items in the todo list by clicking the checkbox beside adding a new todo item input field.
- A todo item can be updated from the list.
- A todo item can also be deleted from the list.
- Delete all the todo items in the list by pressing the "DELETE ALL" button at the bottom. The window will alert the user to confirm the action.
- Any todo items in the list have details of created on, updated on, and deleted on (if it is marked finished) time logs available.
- The application also supports mobile users. 

### Usage
- The applicaton can be directly accessed in browser through the URL: https://west352.github.io/todo-list-react/
- The application can be cloned to user's local computer and viewd or modified through any code editor such as VSCode.
- Make sure to download the Node.js runtime environment on your local machine, if you want to modify the application in a code editor.

### Command Line Interfaces

#### Install Dependencies
After cloning the repo, run `npm install` to install dependencies.

#### Code Style
If your commit fails, it is probably due to code style problems. Run `npm run check` to check for code style problems and run `npm run fix` to fix problems that can be fixed automatically (e.g. indentation).

#### Development
Start development server by running `npm run start`.

#### Build
Create a production build by running `npm run build`.

#### Deploy
After creating a production build, deploy to GitHub Pages by running `npm run deploy`. However, it is necessary to do manual deployment like this because automatic deployment has been set up with GitHub Actions.

### License
MIT License. Copyright (c) [2022] [West Liu]
