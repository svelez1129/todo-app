import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    // State for todos
    const [todos, setTodos] = useState([]);
    // State for input fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //counter to generate id
    const [idCounter, setIdCounter] = useState(1); 

    // Load todos from localStorage when the component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    // Function to create a new todo
    const createTodo = () => {
      const newTodo = {
        id: uuidv4(),
        title,
        description,
      };
      setIdCounter(idCounter + 1);
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTitle('');
      setDescription('');

    };

    //Function to mark a todo as completed
    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };
  
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-info btn-lg my-5 p-3 col-4 fw-bold h3"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            New Todo
          </button>
  
          {/* Modal */}
          <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">New Todo</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={createTodo}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Todo List */}
        <div className="row">
            {todos.map((todo, _) => (
                <Todo
                key={todo.id}
                title={todo.title}
                description={todo.description}
                onDelete={handleDelete}
                id={todo.id}
                />
            ))}
        </div>
      </div>
    );
  }