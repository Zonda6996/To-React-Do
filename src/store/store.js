import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'

const store = configureStore({
	reducer: {
		todosList: todosReducer
	}
})

store.subscribe(() => {
	const state = store.getState()
	localStorage.setItem('todos', JSON.stringify(state.todosList))
})

export default store