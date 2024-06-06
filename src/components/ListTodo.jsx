import React, { useEffect, useState } from 'react'
import InputTodo from './InputTodo';
import { FaEdit } from 'react-icons/fa'
import { MdOutlineDeleteSweep } from "react-icons/md";

function ListTodo() {
    const [colorIndex, setColorIndex] = useState(0);
    const [todo, setTodo] = useState([])
    const [done, setDone] = useState(false)

    const colors = ['black', '#FF5631', '#CEBEA4'];

    const handleBgcolor = () => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    useEffect(() => {
        const getAllTodo = async () => {
            try {
                const response = await fetch("http://localhost:3000/todos", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                if (Array.isArray(data.rows)) {
                    setTodo(data.rows)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getAllTodo()
    }, [todo])


    const handleCheckBox = (index) => {
        setDone(!done)
        const newTodos = [...todo];
        newTodos[index].done = !newTodos[index].done;
        setTodo(newTodos);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
            });
            console.log(response, "response of deleting");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='min-h-screen flex flex-col gap-3 items-center justify-center p-4' style={{ backgroundColor: colors[colorIndex] }}>
            <div className="bg-black rounded-2xl p-8 max-w-lg w-full">
                <header className="flex justify-between items-center mb-8">
                    <div className="text-white font-bold text-xl">
                        XERO<span className="text-[#FF5631]">TODO</span>
                    </div>
                    <div className="bg-white rounded-full p-2 cursor-pointer">
                        <span className="block w-3 h-3 bg-black rounded-full" onClick={handleBgcolor}></span>
                    </div>
                </header>
                <div className="border-2 border-[#CEBEA4] rounded-2xl p-6 mb-8 text-center">
                    <div className="text-[#CEBEA4] font-bold text-2xl mb-2">Todo Done</div>
                    <div className="text-[#CEBEA4] text-sm mb-6">keep it up</div>
                    <div className="bg-[#FF5631] text-black text-2xl font-bold rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        1/3
                    </div>
                </div>
                <InputTodo setTodo={setTodo} />
            </div>
            {Array.isArray(todo) && todo.map((data) => (
                <div key={data.todo_id} className="flex flex-row items-center justify-between bg-black rounded-2xl p-6 max-w-lg w-full border-2 border-white">
                    <div className='flex flex-row gap-4'>
                        <input type="checkbox" onClick={()=>handleCheckBox(data.todo_id)} />
                        <h1 className={`text-white font-bold ${done === true  ? 'line-through' : ''}`}>{data.description}</h1>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <FaEdit className='text-white text-xl' />
                        <MdOutlineDeleteSweep className='text-white text-xl' onClick={() => handleDelete(data?.todo_id)} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListTodo
