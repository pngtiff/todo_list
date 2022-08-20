import React from "react";
// import lightMode from '../images/icon-sun.svg';
// import darkMode from '../images/icon-moon.svg';
import {nanoid} from "nanoid"
import Footer from "./Footer"

function Todo(props) {
    const dragItem = React.useRef();
    const dragOverItem = React.useRef();

    const [todos, setTodos] = React.useState(
        () => JSON.parse(localStorage.getItem("todos")) || 
        [{id: '1', body: 'Complete Todo App', completed: false},
        {id: '2', body: 'Pick up groceries', completed: false},
        {id: '3', body: 'Read for 1 hour', completed: false},
        {id: '4', body: 'Daily yoga', completed: false},
        {id: '5', body: 'Complete Google PM course', completed: false}]
    )

    React.useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    
    const [filter, setFilter] = React.useState('all')

    const [currentTodoId, setCurrentTodoId] = React.useState(
        ((todos[0] && todos[0].id) || "")
    )


    function newTodo(e) {
        let value; 
        if(e.key === 'Enter') {
            value = e.target.value;
            e.target.value = "";
        } else return

        const newTodo = {
            id: nanoid(),
            body: value,
            completed: false
        }
        setTodos(prevList => [newTodo, ...prevList])
        setCurrentTodoId(newTodo.id)
    }

    // function findCurrentTodo() {
    //     return todos.find(todo => {
    //         return todo.id === currentTodoId
    //     }) || todos[0]
    // }

    function updateTodo(e) {
        setTodos(oldTodos => oldTodos.map((oldTodo) => {
            return oldTodo.id === currentTodoId ? {...oldTodo, body: e.target.value} : oldTodo
            })
        )
        //     const newArray = []
        //     for(let i=0; i<oldTodos.length; i++) {
        //         const oldTodo = oldTodos[i];
        //         if(oldTodo.id === currentTodoId) {
        //             newArray.unshift({...oldTodo, body: e.target.value})
        //         } else {
        //             newArray.push(oldTodo)
        //         }
        //     }
        //     return newArray
        // })
    }


    function completeTodo(todo) {
        setTodos(oldTodos => oldTodos.map(oldTodo => {
            return oldTodo.id === todo.id ? {...oldTodo, completed: !oldTodo.completed} : oldTodo
        }))
    }

    function clearCompleted() {
        setTodos(oldTodos => oldTodos.filter(todo => todo.completed !== true))
    }

    function deleteTodo(event, todoId) {
        event.stopPropagation();
        setTodos(oldTodos => oldTodos.filter(todo => todo.id !== todoId))
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML)

    }

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML)
    }

    const drop = (e) => {
        const rearrangedList = [...todos];
        const dragItemContent = rearrangedList[dragItem.current];
        rearrangedList.splice(dragItem.current, 1);
        rearrangedList.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setTodos(rearrangedList);
    }

    
    // setting up todo item
    const todoElements = function() {
        let filteredTodos = filter === 'all' ? todos : filter === 'completed'
        ? [...todos].filter(todo => todo.completed === true) 
        : [...todos].filter(todo => todo.completed !== true)

        return filteredTodos.map((todo, index) => (
        <div key={todo.id} draggable
            className={`todoItem ${(todo.completed) ? 'checked' : ''}`} 
            onClick={() => setCurrentTodoId(todo.id)}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}>
            <div className="circle" 
                onClick={() => completeTodo(todo)}
            ></div>
            <input type="text" defaultValue={todo.body} onChange={updateTodo}
                onClick={function() {
                    console.log(todo)
                    // console.log('text '+currentTodoId)
                }}
            ></input>
            <div className="cross" onClick={(event) => deleteTodo(event, todo.id)}></div>
        </div>
    ))} ()


    return (
    <>
        {/* <div className="headerContainer">
            <h1>TODO</h1>
            <div className="toggle" onClick={props.toggleDarkMode}>
                <img src={props.darkMode ? darkMode : lightMode} alt="header banner"></img>
            </div>
        </div> */}
        <div id="todoContainer" className={props.darkMode ? "dark" : ""}>
            <div id="newTodo">
                <div className="circle"></div>
                <input type="text" placeholder="What to do?" onKeyUp={newTodo}></input>
            </div>

            <div id="todoItemsList">
                {todoElements}
            </div>

            <Footer 
                todos={todos}
                clearCompleted={clearCompleted}
                setFilter={setFilter}
                filter={filter}
            />

            <div id="direction"><span>Drag and drop to rearrange</span></div>
        </div>
    </>
    )
}

export default Todo;