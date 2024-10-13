import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Alert from '@mui/material/Alert';


function Content() {
  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinised, setshowFinised] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("temp");
    if(todoString){
      let k = JSON.parse(todoString);
      setTodos(k);
    }
  }, [])
  

  let trackTheChange = (e) =>{
    // console.log(e.target.value);
    setTodo(e.target.value);
  }

  let addToList = (e) => {
    // console.log("you click addToList");
    // console.log(e.target.value);
    // console.log(e.target.value)
    if(e.target.value !== ""){
      setTodos([...todos, {task: todo, id: uuidv4(), isDone: false}]);
      setTodo("");
      // console.log(todos);
    }

    saveToLocal();
  }

  let handleCheckBox = (e) => {
    console.log("toggling");
    let idd  = e.target.name;

    let index = todos.findIndex(item =>{
      return item.id === idd;
    });

    let newTodos = [...todos];

    newTodos[index].isDone = !newTodos[index].isDone;

    setTodos(newTodos);

    saveToLocal();
  }

  let handleDelete = (id) => {
    // console.log(`${id}`);
    const userConfirm = window.confirm("Are you sure you want to delete this item?");
    if(userConfirm){
      alert('Item deleted successfully!')
      // setTodos((prevTodo) => todos.filter((k) => k.id !== id));
      // or
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
    }
    else alert('Action cancelled!');

    saveToLocal();
  };

  let handleEdit = (id) => {
    // console.log(`${id}`);
    let data = todos.filter((item) =>{
      if(item.id === id){
        // console.log(item.task);
        return item.task;
      }
    })
    setTodo(data[0].task);

    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);

    saveToLocal();
  }

  const saveToLocal = (params) =>{
    localStorage.setItem("temp", JSON.stringify(todos));     // local storage me save karne ki liye hai ye function
  }

  const toggleFinished = (e) => {
    setshowFinised(!showFinised);
  }

  return (
    <div className='bg-[#3c4043] min-h-screen  p-10'>
      <div className='sm:w-[100%] lg:w-[50%] mx-auto my-0 rounded-xl p-5 bg-violet-100 min-h-[80vh]'>
        <h1 className='font-bold text-3xl text-center mb-8'>Manage your all tasks here!</h1>
        <div className='addTodo my-4'>
          <h2 className='text-xl font-bold mb-2'>Add a Todo</h2>
          <div className='lg:flex lg:flex-row'>
            <input type="text" className='below-1024:w-[95%] below-1024:mb-2 w-[400px] rounded-lg h-[35px] px-4 py-4' placeholder="Type your today's work here" value={todo} onChange={trackTheChange} />
            <button className='below-1024:w-[95%] below-1024:mx-0 below-1024:py-0.5 w-16 bg-violet-600 hover:bg-violet-800 rounded-xl py-1.5 px-3 text-white mx-2' value={todo} onClick={addToList}> Save </button>
          </div>
        </div>

        <div className='flex gap-1'>
          <input onChange={toggleFinished} type="checkbox" checked={showFinised} />
          <div>Show finished</div>
        </div>

        <div className='h-[1px] bg-black mt-4 opacity-30'></div>

        <h2 className='text-xl font-bold my-4'>Your Todos</h2>
        {todos.length === 0 && <div className='m-5'>No Todos to display!</div>}
        <div className='todos'>
          {todos.map(item =>{

            return (showFinised || !item.isDone) && <div key={item.id} className='todo below-1024:w-full flex m-2 justify-between w-3/4'>
              <div className='flex gap-4'>
                <input onChange={handleCheckBox} name={item.id} type="checkbox" className={item.isdone} />
                <div className={item.isDone ? "line-through" : ""}>{item.task}</div>
              </div>
              <div className='buttons flex h-full'>
                <button onClick={()=>handleEdit(item.id)} className='bg-violet-600 hover:bg-violet-800 rounded-xl py-1 px-2 text-white mx-4'><EditNoteIcon></EditNoteIcon></button>
                <button onClick={()=>handleDelete(item.id)} className='bg-violet-600 hover:bg-violet-800 rounded-xl py-1 px-2 text-white'><DeleteIcon></DeleteIcon></button>
              </div>
            </div>  

          })}
        </div>
      </div>
    </div>
  )
}

export default Content