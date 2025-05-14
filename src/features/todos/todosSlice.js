import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTodos = () => {
	try {
		const data = localStorage.getItem('todos')
		return data ? JSON.parse(data) : { todos: [], filter: 'all', sort: 'newest', searchQuery: '' }
	} catch {
		return { todos: [], filter: 'all', sort: 'newest' }
	}
}

const todosSlice = createSlice({
	name: 'todosList',
	initialState: loadTodos(),
	reducers: {
		addTodo: {
			reducer(state, action) {
				state.todos.push(action.payload)
			},
			prepare(name, dueDate = '', dueTime = '', priority = 'low') {
				return {
					payload: {
						id: nanoid(),
						name,
						completed: false,
						createdAt: Date.now(),
						completedAt: null,
						dueDate,
						dueTime,
						priority
					}
				}
			}
		},
		deleteTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		},
		completeTodo(state, action) {
			const todo = state.todos.find(t => t.id === action.payload)
			if (todo) {
				todo.completed = !todo.completed
				todo.completedAt = todo.completed ? Date.now() : null
			}
		},
		updateTodoName(state, { payload: { id, name } }) {
			const todo = state.todos.find(t => t.id === id)
			if (todo) todo.name = name
		},
		setFilter(state, action) {
			state.filter = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		searchTodos(state, action) {
			state.searchQuery = action.payload
		},
		setDueDate(state, { payload: { id, dueDate } }) {
			const todo = state.todos.find(t => t.id === id)
			if (todo) todo.dueDate = dueDate
		},
		setDueTime(state, { payload: { id, dueTime } }) {
			const todo = state.todos.find(t => t.id === id)
			if (todo) todo.dueTime = dueTime
		},
		setPriority(state, { payload: { id, priority } }) {
			const todo = state.todos.find(t => t.id === id)
			if (todo) todo.priority = priority
		}
	}
})

export const { addTodo, deleteTodo, completeTodo, updateTodoName, setFilter, setSort, searchTodos, setDueDate, setDueTime, setPriority } = todosSlice.actions
export default todosSlice.reducer