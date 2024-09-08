import React, { useState } from "react";

type TodoFormProps = {
    onCreate: (title: string, description: string) => void;
};

export function NewTodoForm({ onCreate }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto"
        >
            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="block text-lg font-semibold text-gray-700 mb-1"
                >
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter task title"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-lg font-semibold text-gray-700 mb-1"
                >
                    Description
                </label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter task description"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white p-3 w-full rounded-md hover:bg-blue-700 transition duration-200"
            >
                Create Task
            </button>
        </form>
    );
}
