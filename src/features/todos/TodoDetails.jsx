import { memo, useState } from 'react'
import clsx from 'clsx'
import { formattedDateTime } from '../../helpers/formattedDateTime'
import { setDueDate, setDueTime } from './todosSlice'
import { useDispatch } from 'react-redux'
import DueInfo from './DueInfo'
import ArrowDownIcon from '../../images/icons/arrowDown.svg?react'
import CompletedIcon from '../../images/icons/completedDetails.svg?react'
import CreatedIcon from '../../images/icons/newest.svg?react'
import DatePicker from '../../UI/DatePicker'
import InfoLine from './InfoLine'

const TodoDetails = memo(function TodoDetails({ todo }) {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()

	function dueDateClear() {
		dispatch(setDueDate({ id: todo.id, dueDate: '' }))
		dispatch(setDueTime({ id: todo.id, dueTime: '' }))
	}

	const arrowButton = clsx(
		'transition-all duration-200 opacity-0 cursor-pointer group-hover:opacity-100',
		{
			'rotate-180': isOpen,
		}
	)

	const datePickerContainerClass = clsx('flex gap-3', {
		'items-center': !todo.completed,
	})

	const infoLineClass = clsx('', {
		'flex justify-between flex-col gap-3 sm:flex-row sm:gap-0': !todo.completed,
	})

	return (
		<>
			<div className='absolute bottom-0 left-1/2'>
				<button className={arrowButton} onClick={() => setIsOpen(!isOpen)}>
					<ArrowDownIcon className='text-gray-400' />
				</button>
			</div>
			{isOpen && (
				<div className='mt-4'>
					<h4 className='text-sm font-light'>Task Details</h4>
					<div className='px-2 py-2 mt-1 mb-2 bg-gray-200 rounded-md'>
						<div className={infoLineClass}>
							{todo.completed && (
								<InfoLine
									icon={CompletedIcon}
									label='Completed at:'
									value={formattedDateTime(todo.completedAt)}
								/>
							)}

							<InfoLine
								icon={CreatedIcon}
								label='Created at:'
								value={formattedDateTime(todo.createdAt)}
								className={todo.completed ? 'mt-4' : ''}
							/>

							{!todo.completed && (
								<div className={datePickerContainerClass}>
									<DatePicker todo={todo} />
									{todo.dueDate ? (
										<p className='text-xs font-light sm:text-sm'>
											Change due date
										</p>
									) : (
										<p className='text-xs font-light sm:text-sm'>
											Add due date
										</p>
									)}
								</div>
							)}
						</div>
						<DueInfo
							dueDate={todo.dueDate}
							dueTime={todo.dueTime}
							completed={todo.completed}
							onClear={dueDateClear}
						/>
					</div>
				</div>
			)}
		</>
	)
})

export default TodoDetails
