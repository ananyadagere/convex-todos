"use client";
import React, { useState } from "react";
import { NewTodoForm } from "./_components/new-todo-form";

type ToDoItem = {
  title: string;
  description?: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { title: "Example", description: "This is an example", completed: false },
  ]);

  const handleRemove = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number, newTitle: string, newDescription?: string) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos[index].title = newTitle;
      newTodos[index].description = newDescription;
      return newTodos;
    });
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-gray-50 shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">To-Do List</h1>
      <ul className="space-y-4 mb-6">
        {todos.map(({ title, description, completed }, index) => (
          <TodoItem
            key={index}
            title={title}
            description={description}
            completed={completed}
            onCompleteChanged={(newValue) => {
              setTodos((prev) => {
                const newTodos = [...prev];
                newTodos[index].completed = newValue;
                return newTodos;
              });
            }}
            onRemove={() => handleRemove(index)}
            onEdit={(newTitle, newDescription) => handleEdit(index, newTitle, newDescription)}
          />
        ))}
      </ul>
      <NewTodoForm
        onCreate={(title, description) => {
          setTodos((prev) => {
            const newTodos = [...prev];
            newTodos.push({ title, description, completed: false });
            return newTodos;
          });
        }}
      />
    </div>
  );
}

function TodoItem({
  title,
  description,
  completed,
  onCompleteChanged,
  onRemove,
  onEdit,
}: {
  title: string;
  description?: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
  onEdit: (newTitle: string, newDescription?: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description || "");

  const handleSaveEdit = () => {
    onEdit(newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between space-x-3 bg-white p-4 shadow-sm rounded-md hover:bg-gray-100 transition duration-200 relative">
      {isEditing ? (
        <div className="flex-1">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 p-1 rounded-md w-full mb-2"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border border-gray-300 p-1 rounded-md w-full"
            placeholder="Optional Description"
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center flex-1 space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => onCompleteChanged(e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
            />
            <div>
              <p className={`font-semibold ${completed ? "line-through text-gray-400" : ""}`}>
                {title}
              </p>
              {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
          </div>

          {/* Three Dots Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              &#8230;
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                  onClick={onRemove}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </li>
  );
}
