import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import useTheme from './contexts/ThemeContext'

function App() {
  const [todos, setTodos] = useState([])
  const [countries, setCountries] = useState([]);
  const {themeMode, lightTheme, darkTheme} = useTheme()


  const toggleDarkMode = () => {
    themeMode == 'light' ? darkTheme() : lightTheme()
  }; 
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        const countries = data.map((d) => {
          return {
            name: d.name.common,
            code: d.cca2
          }
        })
        setCountries(countries)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountries()
  }, [])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className={`w-full h-screen ${themeMode == 'dark' ? 'bg-[#172842]' : 'bg-[#54C392]'}`}>
        <div className="flex justify-end px-5">
          <button
            onClick={toggleDarkMode}
            className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              className={`fill-violet-700 ${themeMode == 'dark' ? 'hidden' : 'block'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              className={`fill-yellow-500 ${themeMode == 'dark' ? 'block' : 'hidden'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3  ${themeMode == 'dark' ? 'text-white bg-[#387478]' : 'text-black bg-[#73EC8B]'}`}>
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm countries={countries} />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
