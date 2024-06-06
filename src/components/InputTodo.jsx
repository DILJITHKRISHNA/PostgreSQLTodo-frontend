import React, { useEffect, useState } from 'react'

function InputTodo({ setTodo }) {
    const [display, setDisplay] = useState("")


    const handleAddTodo = async (e) => {
        e.preventDefault()
        try {
            setTodo(display)
            const body = { display }
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center mb-6 gap-2">
            <input
                type="text"
                placeholder="write your next task"
                className="flex-1 bg-gray-700 text-gray-400 px-4 py-2 rounded-full focus:outline-none"
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
            />
            <button className="bg-[#FF5631] text-black rounded-full px-4 py-2" onClick={handleAddTodo}>
                +
            </button>
        </div>
    )
}

export default InputTodo
