import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, completeTodo, setPriority } from './todosSlice'
import clsx from 'clsx'
import useEditTodo from '../../hooks/useEditTodo'
import checkboxFilled from '../../images/icons/checkboxFilled.svg'
import checkboxEmpty from '../../images/icons/checkboxEmpty.svg'
import TrashIcon from '../../images/icons/trash.svg?react'
import DueInfo from './DueInfo'
import TodoDetails from './TodoDetails'
import { isTouchDevice } from '../../helpers/isTouchDevice'

const TodoListItem = memo(function TodoListItem({ todo }) {
	const dispatch = useDispatch()
	const [hovered, setHovered] = useState({ type: null, id: null })

	const {
		editingId,
		newName,
		inputRef,
		handleEditClick,
		handleChange,
		handleSave,
		handleKeyDown,
	} = useEditTodo()

	const isHovered = type => hovered.id === todo.id && hovered.type === type

	function getCheckboxSrc() {
		return todo.completed ||
			(hovered.type === 'checkbox' && hovered.id === todo.id)
			? checkboxFilled
			: checkboxEmpty
	}

	function handleChangePriority(e) {
		dispatch(setPriority({ id: todo.id, priority: e.target.value }))
	}

	function onIconMouseEnter(type, id) {
		if (!isTouchDevice()) {
			setHovered({ type: type, id: id })
		}
	}

	function onIconMouseLeave() {
		if (!isTouchDevice()) {
			setHovered({ type: null, id: null })
		}
	}

	const todoClass = clsx(
		'relative px-5 py-3 sm:py-5 text-lg group font-semibold transition-colors rounded-md shadow-md ',
		{
			'bg-gray-100':
				(!todo.completed && hovered.id !== todo.id) ||
				hovered.type !== 'trashIcon',
			'bg-red-600/30': isHovered('trashIcon'),
			'bg-green-600/30': todo.completed,
		}
	)

	const priorityClass = clsx(
		'p-0.5 text-xs font-medium focus:outline-0 rounded-md text-gray-50 mt-2 max-w-13',
		{
			'bg-priority-green': todo.priority === 'low',
			'bg-priority-orange': todo.priority === 'medium',
			'bg-priority-red': todo.priority === 'high',
		}
	)

	return (
		<li className={todoClass}>
			<div className='flex items-center justify-between w-full gap-2 py-2'>
				<div className='flex items-center flex-1 min-w-0 gap-3 text-base sm:text-lg'>
					<button
						onClick={() => dispatch(completeTodo(todo.id))}
						onMouseEnter={() => onIconMouseEnter('checkbox', todo.id)}
						onMouseLeave={onIconMouseLeave}
						className='cursor-pointer shrink-0'
					>
						<img
							src={getCheckboxSrc()}
							alt='Checkbox'
							className='w-6 transition-colors rounded-sm hover:bg-green-600/30'
						/>
					</button>

					{editingId === todo.id ? (
						<input
							className='w-full bg-transparent focus:outline-0 active:outline-0'
							type='text'
							ref={inputRef}
							value={newName}
							onChange={handleChange}
							onBlur={() => handleSave(todo.id)}
							onKeyDown={e => handleKeyDown(e, todo.id)}
						/>
					) : (
						<p
							className={`truncate min-w-0 flex-1 cursor-pointer ${
								todo.completed ? 'line-through text-light-gray' : ''
							}`}
							onClick={() => handleEditClick(todo)}
						>
							{todo.name}
						</p>
					)}
				</div>

				<button
					className='cursor-pointer shrink-0'
					onClick={() => dispatch(deleteTodo(todo.id))}
					onMouseEnter={() => onIconMouseEnter('trashIcon', todo.id)}
					onMouseLeave={onIconMouseLeave}
				>
					<TrashIcon
						className='w-5 h-5 transition-colors sm:w-6 sm:h-6 hover:text-red-600'
						style={{ fill: 'currentColor' }}
					/>
				</button>
			</div>

			<div className='flex flex-col gap-2 sm:flex-row sm:items-baseline-last'>
				<DueInfo
					dueDate={todo.dueDate}
					dueTime={todo.dueTime}
					completed={todo.completed}
				/>
				<div className={priorityClass}>
					<select
						className='text-center appearance-none cursor-pointer focus:outline-0'
						value={todo.priority}
						onChange={handleChangePriority}
					>
						<option className='text-black bg-gray-200 ' disabled>
							Priority
						</option>
						<option className='text-black' value='low'>
							Low
						</option>
						<option className='text-black' value='medium'>
							Medium
						</option>
						<option className='text-black' value='high'>
							High
						</option>
					</select>
				</div>
			</div>
			<TodoDetails todo={todo} />
		</li>
	)
})

export default TodoListItem
