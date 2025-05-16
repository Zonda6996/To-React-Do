import { useSelector } from 'react-redux'
import TodoFiltration from './TodoFiltration'
import { memo } from 'react'

function TodoListHeader() {
	const todosLength = useSelector(state => state.todosList.todos.length)

	return (
		<>
			{todosLength !== 0 ? (
				<div className='relative flex justify-between mt-10'>
					<h4 className='text-xl font-semibold'>Task List:</h4>
					<TodoFiltration />
				</div>
			) : null}
		</>
	)
}

export default memo(TodoListHeader)
