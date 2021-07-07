import React,{useEffect, useState} from 'react'
import { BsTrash } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


//get todo from localstorage to save our previous todos
const getTodos = () => {
    let lists = localStorage.getItem('todos')
    return lists ? JSON.parse(localStorage.getItem('todos')) : []
}

const Todo = () => {
    const [input,setInput] = useState("")
    const [todo, setTodo] = useState(getTodos())
    const handleClick =(event) => {
        event.preventDefault()
        setTodo([...todo,input])
        setInput("")
    }

    const handleDelete = (id) => {
        const updatedList = todo.filter( (element,index) => {
            return index !== id
        })
        return setTodo(updatedList)
    }

    // display current weekday
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date();
    let dayName = days[d.getDay()];
    const currentYear = new Date().getFullYear()

    // add todo in localStorage 
    useEffect( () => {
        localStorage.setItem('todos',JSON.stringify(todo))
    },[todo])

    return (
        <>
            <div className="todo__wrapper bg-white rounded-xl shadow-xl p-8 box-border mt-12">

                <div className="py-6">
                    <h1 className="text-3xl">{`${dayName} ${currentYear}`}</h1>
                    <h5 className="py-2 text-xl font-semibold text-blue-700">{todo.length} tasks</h5>
                </div>
                <form classname="flex flex-row items-center">
                    <TextField 
                    id="outlined-basic" 
                        label="Write a todo" variant="outlined"
                    type="text" 
                    placeholder="Write todo"
                    value={input}
                    name="input"
                    className="flex flex-grow py-2 px-4 border border-gray-300 w-72"
                        onChange={(event) => setInput(event.target.value)}
                    />

                    <Button disabled={!input} type="submit" onClick={handleClick} className="bg-blue-600 add__btn">
                        <HiOutlinePlus className="text-5xl bg-blue-600 text-white rounded-xl"/>
                    </Button>
  
                </form>

                <div className="flex flex-col-reverse">
                    {todo.map((element, id) => {
                        return (
                            <>
                                <div className="todos flex flex-row items-center py-4 px-5 bg-white shadow-xl text-gray-700 my-4 rounded-lg" key={id}>
                                    <span className="todo__text flex flex-grow ">{element}</span>
                                    <BsTrash className="text-2xl hover:text-red-700 cursor-pointer" onClick={() => handleDelete(id)} />
                                </div>
                            </>
                        )
                    })}
                </div>
            

            </div>
        </>
    )
}

export default Todo
