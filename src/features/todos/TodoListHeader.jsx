import { useSelector } from 'react-redux'
import TodoFiltration from './TodoFiltration'

function TodoListHeader() {
	const todos = useSelector(state => state.todosList.todos)

	return (
		<>
			{todos.length !== 0 ? (
				<div className='relative flex justify-between mt-10'>
					<h4 className='text-xl font-semibold'>Task List:</h4>
					<TodoFiltration />
				</div>
			) : null}
		</>
	)
}

export default TodoListHeader
