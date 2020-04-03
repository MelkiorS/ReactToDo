import React from 'react';
import TodoList from "./todo/totoList";
import AddTodo from "./todo/addTodo";
import Context from "./context";

function App() {
    const [todos, setTodos] = React.useState([
        {id:1, completed: false, title: 'ку1'},
        {id:2, completed: true, title: 'ку2'},
        {id:3, completed: false, title: 'ку3'},
    ]);

    function toggleTodo(id){
        setTodos( todos.map(todo=> {
            if(todo.id === id){
                todo.completed = !todo.completed;
            }
            return todo;
        }))
    }
    
    function removeToto(id) {
            setTodos(todos.filter(t=>t.id !== id));
    }
    
    function addTodo(title) {
        setTodos(todos.concat(
            {
                title: title,
                id: Date.now(),
                completed: false,
            }));
    }

  return (
      <Context.Provider value={{removeToto}}>
          <div className='wrapper'>
              <h1>React FFF</h1>
              <AddTodo onCreate={addTodo}/>
              {todos.length
                  ? <TodoList todos={todos} onToggle={toggleTodo}/>
                  : <p>No todos!</p>
              }
          </div>
      </Context.Provider>
  );
}

export default App;
