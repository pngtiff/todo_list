import { within } from "@testing-library/react";
import React from "react";

function Footer(props) {
    function filterTodos(status, e) {
        props.setFilter(status)

        // if(status==='all') {
        //     props.setFilteredTodos([...props.todos])
        // } else if(!status) { 
        //     // if complete status is false ('active')
        //     // then filter for todos that are completed: false
        //     props.setFilteredTodos(
        //         [...props.todos].filter(todo => todo.completed !== true)
        //     )
        // } else if (status) {
        //     // if complete status is true ('completed')
        //     // then filter for todos that are completed: true
        //     props.setFilteredTodos(
        //         [...props.todos].filter(todo => todo.completed === true)
        //     )
        // }
    }
    
    function findActive() {
        let count = 0;
        for(let i=0; i<props.todos.length; i++) {
            if(!props.todos[i].completed) {
                count++
            }
        }
        return count
    }

    const [width, setWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        function adjustWidth() {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', adjustWidth)

        return function() {
            window.removeEventListener('resize', adjustWidth)
        }
    }, [])


    if(width > 600) {
        return(
            <div id="listDetails">
                <p>{findActive()} Items Left</p>
                <div>
                    <p className={props.filter == 'all' ? 'currentList' : ''} 
                        onClick={(e) => filterTodos('all', e)}>All</p>
                    <p className={props.filter == 'active' ? 'currentList' : ''} 
                        onClick={(e) => filterTodos('active', e)}>Active</p>
                    <p className={props.filter == 'completed' ? 'currentList' : ''} 
                        onClick={(e) => filterTodos('completed', e)}>Completed</p>
                </div>
                <p className='clear' 
                    onClick={() => props.todos.map(() => props.clearCompleted())}
                >Clear Completed</p>
            </div>
        )
    } else {
        return(
            <>
            <div id="listDetails">
                <p>{findActive()} Items Left</p>
                <p className='clear' 
                    onClick={() => props.todos.map(() => props.clearCompleted())}
                >Clear Completed</p>
            </div>
            <div id="filters">
                <p className={props.filter == 'all' ? 'currentList' : ''} 
                    onClick={(e) => filterTodos('all', e)}>All</p>
                <p className={props.filter == 'active' ? 'currentList' : ''} 
                    onClick={(e) => filterTodos('active', e)}>Active</p>
                <p className={props.filter == 'completed' ? 'currentList' : ''} 
                    onClick={(e) => filterTodos('completed', e)}>Completed</p>
            </div>
            </>
        )
    }
}

export default Footer