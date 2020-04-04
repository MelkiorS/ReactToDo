import React, {useEffect} from 'react';
import TodoList from "./todo/totoList";
import AddTodo from "./todo/addTodo";
import Context from "./context";
import Loader from  "./loader";

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loadin, setLoading] = React.useState(true);

    useEffect(()=>{
        fetch('http://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos =>
                setTimeout(()=>{
                    setTodos(todos);
                    setLoading(false);
                },2000))
    },[]);

    function toggleTodo(id){
        setTodos( todos.map(todo=> {
            if(todo.id === id){
                todo.completed = !todo.completed;
            }
            return todo;
        }))
    }
    
    function removeTodo(id) {
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
      <Context.Provider value={{removeTodo}}>
          <div className='wrapper'>
              <h1>React FFF</h1>
              <AddTodo onCreate={addTodo}/>
              {loadin && <Loader/>}
              {todos.length
                  ? <TodoList todos={todos} onToggle={toggleTodo}/>
                  : loadin ? null : <p>no todos!</p>
              }
          </div>
      </Context.Provider>
  );
}

export default App;
