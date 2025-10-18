// import { useEffect, useState } from "react"
// import axios from 'axios';

// function Home() {
//   const [newTodo, setNewTodo]= useState("");
//   const [todos, setTodos] = useState([]);
//   const email = JSON.parse(localStorage.getItem("email"))
//   console.log(email)
//   const addTodo = async (e) => {
//     e.preventDefault();
//     if(!newTodo.trim()) return;
//     try {
//       const response = await axios.post("https://nm-project-gq9z.onrender.com/todo/create", { title: newTodo, email: email })
//       setTodos([...todos, response.data])
//       setNewTodo('');
//     } catch(error) {
//       console.log("Error adding todo:",error);

//     }  
//   };



//   const fetchTodos = async () => {
//     try {
//       const response = await axios.post("https://nm-project-gq9z.onrender.com/todo/get", {email});
//       setTodos(response.data.response)

//     }catch (error){
//       console.log("Error fetching todos:",error)

//     }
//   }



//   useEffect(() => {
//     fetchTodos();
//   }, [todos]);
//   return (
//   <div className="min-h-screen bg-gradient-to-br from purple-100 to-purple-700 flex items-center
//   justify-center p-4">
//     <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
      
//         <h1 className="text-4xl font-bold text-purple-700 mb-8">
//           Task Manager
//           </h1>
      
//       <form onSubmit={addTodo} className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg">
//         <input 
//         className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
//         type="text" 
//         value={newTodo} 
//         onChange={(e) => setNewTodo(e.target.value)}
//         placeholder="Enter your task..."
//         required
//          />
//          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md 
//          font-medium cursor-pointer">Add Task</button>
//       </form>
//       <div>
//         {todos.length === 0 ? (
//           <div></div>
//         ) : (
//           <div>
//             {todos.map((todo) => (
//               <div className="bg-purple-400 my-3 rounded-lg px-3 text-white font-bold h-10" key={todo._id}>{todo.title}

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Home

import { useEffect, useState } from "react";
import axios from "axios";
import { PiCornersOutLight } from "react-icons/pi";

function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  var email; 

  // 🔹 Add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post("https://nm-project-gq9z.onrender.com/todo/create", {
        title: newTodo,
        email,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  // 🔹 Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.post("https://nm-project-gq9z.onrender.com/todo/get", {
        email,
      });
      setTodos(response.data.response);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // 🔹 Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://nm-project-gq9z.onrender.com/todo/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  // 🔹 Start editing
  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditValue(todo.title);
  };

  // 🔹 Save edited todo
  const saveEdit = async (id) => {
    if (!editValue.trim()) return;
    try {
      await axios.put(`https://nm-project-gq9z.onrender.com/todo/getone`, {
        title: editValue,
        email,
        todoId: id
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, title: editValue } : todo
        )
      );
      setEditId(null);
      setEditValue("");
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  useEffect(() => {
    email =  localStorage.getItem("email");
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-8 text-center">
          Task Manager
        </h1>

        {/* Add task form */}
        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task..."
            required
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>

        {/* Tasks list */}
        <div className="mt-4">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No tasks yet.</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="bg-purple-400 my-3 rounded-lg px-3 py-2 text-white font-bold flex justify-between items-center"
              >
                {editId === todo._id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 bg-white text-gray-700 rounded-md px-2 py-1 mr-2 outline-none"
                  />
                ) : (
                  <span className="flex-1">{todo.title}</span>
                )}

                <div className="flex gap-2">
                  {editId === todo._id ? (
                    <button
                      onClick={() => saveEdit(todo._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(todo)}
                      className="bg-blue-500 hover:bg-purple-700 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
