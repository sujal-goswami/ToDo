import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm({ countries }) {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()
    const [selectedCountry, setSelectedCountry] = useState("")
    const [user, setUser] = useState("")
    
    const add = (e) => {
      e.preventDefault()

      if (!todo || !selectedCountry || !user) return

      addTodo({ todo, completed: false, country: selectedCountry, user })
      setTodo("")
      setSelectedCountry("")
      setUser("")
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              maxLength={120}
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <input
              type="text"
              maxLength={50}
              placeholder="User assigned"
              className="w-40 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={user}
              onChange={(e) => setUser(e.target.value)}
          />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-40 border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          >
        <option className="text-black" value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option className="text-black" key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
      </form>
  );
}

export default TodoForm;