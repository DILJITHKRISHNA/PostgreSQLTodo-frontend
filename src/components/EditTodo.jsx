import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

function EditTodo({ description, setTodos, todoId }) {
    const [open, setOpen] = useState(false)
    const [Description, setDescription] = useState(description)

    const handleOpen = () => {
        setOpen(!open)
    }
    const handleConfirm = async (e) => {
        e.preventDefault()
        try {
            setTodos(Description)
            setOpen(false)
            console.log(todoId, "todo iddd");
            const body = { Description }
            console.log(body, "bodyyyy");
            // const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
            const response = await fetch(`https://xerotodo.onrender.com/todos/${todoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button type="button" className="text-white text-xl" onClick={handleOpen}>
                <FaEdit />
            </button>
            {open ?
                <div x-show="open" className="fixed inset-0 z-50 overflow-auto bg-gray-500  bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
                    <div className="relative mx-auto p-4 w-full max-w-md bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <h3 className="text-xl font-medium text-[#FF5631]">Edit Your Todo</h3>
                        </div>
                        <div className="flex flex-col p-3 gap-4">
                            <label htmlFor="" classNameName='font-bold'>Description</label>
                            <input type="text" classNameName='border border-black p-1 rounded-md' value={Description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button type="button" className="text-black bg-gray-100 px-4 py-2 rounded-md shadow focus:outline-none hover:bg-gray-200" onClick={handleOpen}>
                                <span>Cancel</span>
                            </button>
                            <button type="button" className="bg-black text-[#FF5631] px-4 py-2 rounded-md shadow focus:outline-none hover:bg-green-700" onClick={handleConfirm}>
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                </div>
                : ""}
        </>
    )
}

export default EditTodo
