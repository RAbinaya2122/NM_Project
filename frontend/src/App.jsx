import { useEffect, useState } from "react"
import axios from 'axios';



function App() {
  const [newTodo, setNewTodo]= useState("");
  const [todos, setTodos] = useState([]);

  // const addTodo = async (e) => {
  //   e.preventDefault();
  //   if(!newTodo.trim()) return;
  //   try {
  //     const response = await axios.post("/todo/create", { title: newTodo, email: "test@gmail.com" })
  //     setTodos([...todos, response.data])
  //     setNewTodo('');
  //   } catch(error) {
  //     console.log("Error adding todo:",error);

  //   }  
  // };
  const addTodo = async (e) => {
  e.preventDefault();
  if (!newTodo.trim()) return;
  try {
    const response = await axios.post("/todo/create", {
      title: newTodo,
      email: "test@gmail.com",  // dummy user
    });
    setTodos([...todos, response.data.response]);  // note `.response` inside API JSON
    setNewTodo('');
  } catch (error) {
    console.log("Error adding todo:", error);
  }
};


  // const fetchTodos = async () => {
  //   try {
  //     const response = await axios.get("/api/todos");
  //     console.log(response.data)

  //   }catch (error){
  //     console.log("Error fetching todos:",error)

  //   }
  // }
  const fetchTodos = async () => {
  try {
    const response = await axios.post("/todo/get", {
      email: "test@gmail.com",
    });
    setTodos(response.data.response);  // important: response structure-la iruku
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};


  useEffect(() => {
    fetchTodos();
  }, []);
  return (
  <div className="min-h-screen bg-gradient-to-br from purple-100 to-purple-700 flex items-center
  justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
      
        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Task Manager
          </h1>
      
      <form onSubmit={addTodo} className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg">
        <input 
        className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter your task..."
        required
         />
         <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md 
         font-medium cursor-pointer">Add Task</button>
      </form>
      <div>
        {todos.length === 0 ? (
          <div></div>
        ) : (
          <div>
            {todos.map((todo) => (
              <div key={todo._id}>{todo.text}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default App
