import { useDispatch, useSelector } from 'react-redux'
import { addTodo, searchTodos } from './todosSlice'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '../../images/icons/search.svg?react'
import AddTaskIcon from '../../images/icons/addTask.svg?react'
import MainInput from '../../UI/MainInput'
import MainButton from '../../UI/MainButton'

function AddTodoForm() {
	const dispatch = useDispatch()

	const [todoName, setTodoName] = useState('')
	const [search, setSearch] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const todos = useSelector(state => state.todosList.todos)

	function handleAddTodo(e) {
		e.preventDefault()

		if (!todoName.trim()) return

		dispatch(addTodo(todoName))

		setTodoName('')
	}

	function inputSwitch(e) {
		e.preventDefault()
		setSearch(prev => !prev)
	}

	function handleSearch(e) {
		e.preventDefault()

		dispatch(searchTodos(searchQuery.trim().toLowerCase()))
	}

	useEffect(() => {
		if (searchQuery === '') dispatch(searchTodos(''))
	}, [searchQuery])

	return (
		<div className='flex flex-col items-center justify-center'>
			<form className='relative flex flex-row items-center justify-center w-full'>
				<AnimatePresence>
					{search ? (
						// Search
						<>
							<MainInput
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								placeholder='Search tasks'
							/>
							<MainButton label='Search' onClick={handleSearch} />
						</>
					) : (
						// Add tasks
						<>
							<MainInput
								value={todoName}
								onChange={e => setTodoName(e.target.value)}
								placeholder='Add new task'
							/>
							<MainButton label='Add' onClick={handleAddTodo} />
						</>
					)}
				</AnimatePresence>

				<button
					className='absolute cursor-pointer right-48'
					onClick={inputSwitch}
				>
					<AnimatePresence mode='wait'>
						{search ? (
							<motion.div
								key='add'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
							>
								<AddTaskIcon
									className='w-6 h-6 text-black transition-colors hover:text-gray-600'
									style={{ fill: 'currentColor' }}
								/>
							</motion.div>
						) : (
							<motion.div
								key='search'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.1 }}
							>
								<SearchIcon
									className='w-6 h-6 text-black transition-colors hover:text-gray-600'
									style={{ stroke: 'currentColor' }}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</button>
			</form>
		</div>
	)
}

export default AddTodoForm
