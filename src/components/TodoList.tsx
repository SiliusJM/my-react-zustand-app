import { useState } from "react"
import { useTodoStore } from "../store/useTodoStore"

const emojiMap: {[key: string]: string} = {
    eat: "Amburguesa",
    sleep: "Mimido",
    boom: "Guayakill"
}

const TodoList: React.FC = () => {
    const [todoText, setTodoText] = useState("");
    const todos = useTodoStore((state) => state.todos);
    const addTodo = useTodoStore((state) => state.addTodo);
    const renoveTodo = useTodoStore((state) => state.removeTodo);

    const handleAddTodo = () => {
        const mappedText = emojiMap[todoText.toLowerCase()] || todoText;
        if (mappedText.trim()){
            addTodo(mappedText);
            setTodoText("");
        }
        
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){
            handleAddTodo();
        };
    };

    return(
        <div>
            <em>Hecho con Zusctand</em>
            <h1>Emoji Todo List</h1>
            <input type="text"
            value={todoText}
            onChange={(e)=> setTodoText(e.target.value)}
            placeholder="Agrega un nuevo todo"
            onKeyDown={handleKeyDown}
            />
            <ul>
                {
                    todos.map((todo)=> (
                        <li 
                        key={todo.id} 
                        onClick={() => renoveTodo(todo.id)}
                        >
                            {todo.text}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TodoList;