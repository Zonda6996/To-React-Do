import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import { useMemo } from 'react'

function TodoList() {
	const { todos, filter, sort, searchQuery } = useSelector(
		state => state.todosList
	)

	const priorityOrder = {
		high: 3,
		medium: 2,
		low: 1,
	}

	// Filtration
	const filteredTodos = useMemo(() => {
		return todos.filter(todo => {
			if (filter === 'active') return !todo.completed

			if (filter === 'completed') return todo.completed

			return true
		})
	}, [todos, filter])

	const searched = useMemo(() => {
		return filteredTodos.filter(todo =>
			todo.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [filteredTodos, searchQuery])

	// Sorting
	const sortedTodos = useMemo(() => {
		return [...searched].sort((a, b) => {
			switch (sort) {
				case 'newest':
					return b.createdAt - a.createdAt
				case 'oldest':
					return a.createdAt - b.createdAt
				case 'priority':
					return priorityOrder[b.priority] - priorityOrder[a.priority]
				case 'dueDate':
					const getDateTime = todo => {
						if (!todo.dueDate) return Infinity
						const dateTimeStr = todo.dueTime
							? `${todo.dueDate}T${todo.dueTime}`
							: `${todo.dueDate}T00:00`
						return new Date(dateTimeStr).getTime()
					}
					return getDateTime(a) - getDateTime(b)
				case 'alphabetically':
					return a.name.localeCompare(b.name)
				default:
					return 0
			}
		})
	}, [searched, sort])

	return (
		<div className='mt-8'>
			<ul className='flex flex-col mt-6 space-y-5'>
				{sortedTodos.length === 0 ? (
					<p className='text-lg font-semibold text-center text-light-gray'>
						It's empty here!
					</p>
				) : null}

				{sortedTodos.map(todo => (
					<TodoListItem key={todo.id} todo={todo} />
				))}
			</ul>
		</div>
	)
}

export default TodoList
