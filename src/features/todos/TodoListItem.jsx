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

	const todoClass = clsx(
		'relative px-5 py-5 text-lg group font-semibold transition-colors rounded-md shadow-md ',
		{
			'bg-gray-100':
				(!todo.completed && hovered.id !== todo.id) ||
				hovered.type !== 'trashIcon',
			'bg-red-600/30': isHovered('trashIcon'),
			'bg-green-600/30': todo.completed,
		}
	)

	const priorityClass = clsx(
		'p-0.5 text-xs font-medium focus:outline-0 rounded-md text-gray-50 mt-2',
		{
			'bg-priority-green': todo.priority === 'low',
			'bg-priority-orange': todo.priority === 'medium',
			'bg-priority-red': todo.priority === 'high',
		}
	)

	return (
		<li className={todoClass}>
			<div className='flex items-center justify-between w-full'>
				<div className='flex flex-col'>
					<div className='flex items-center min-w-0 pr-3 space-x-3'>
						<button
							onClick={() => dispatch(completeTodo(todo.id))}
							onMouseEnter={() => setHovered({ type: 'checkbox', id: todo.id })}
							onMouseLeave={() => setHovered({ type: null, id: null })}
							className='cursor-pointer'
						>
							<img
								src={getCheckboxSrc()}
								alt='Checkbox'
								className='w-6 transition-colors rounded-sm hover:bg-green-600/30'
							/>
						</button>
						{editingId === todo.id ? (
							<input
								className='w-[635px] focus:outline-0 active:outline-0'
								type='text'
								ref={inputRef}
								value={newName}
								onChange={handleChange}
								onBlur={() => handleSave(todo.id)}
								onKeyDown={e => handleKeyDown(e, todo.id)}
							/>
						) : (
							<p
								className={
									todo.completed
										? 'line-through flex-1 truncate'
										: 'flex-1 truncate max-w-[635px]'
								}
								onClick={() => handleEditClick(todo)}
							>
								{todo.name}
							</p>
						)}
					</div>
				</div>
				<div className='flex flex-col items-center space-x-4'>
					<button
						className='cursor-pointer'
						onClick={() => dispatch(deleteTodo(todo.id))}
						onMouseEnter={() => setHovered({ type: 'trashIcon', id: todo.id })}
						onMouseLeave={() => setHovered({ type: null, id: null })}
					>
						<TrashIcon
							className='w-6 h-6 transition-colors hover:text-red-600'
							style={{ fill: 'currentColor' }}
						/>
					</button>
				</div>
			</div>
			<div className='flex gap-2 items-baseline-last'>
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
						<option className='text-black bg-gray-200' disabled>
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
