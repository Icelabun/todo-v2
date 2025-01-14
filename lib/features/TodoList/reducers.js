import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    loading: false,
    error: null,
    editingTodo: null
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{
        addTodo: (state, action) =>{
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action)=>{
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action)=>{
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        setEditingTodo: (state, action) => {
            state.editingTodo = action.payload;
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
            }
            state.editingTodo = null;
        },
        setLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setError: (state, action)=>{
            state.error = action.payload;
        }
    }
});

export const { 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    setEditingTodo,
    updateTodo,
    setLoading, 
    setError 
} = todoSlice.actions;

export default todoSlice.reducer;