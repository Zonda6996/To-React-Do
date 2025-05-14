import clsx from 'clsx'
import { formattedDateTime } from '../../helpers/formattedDateTime'
import { isOverdue } from '../../helpers/isOverdue'
import CalendarIcon from '../../images/icons/calendarDueDate.svg?react'

function DueInfo({ dueDate, dueTime, onClear, completed }) {
	if (!dueDate && !dueTime) return null

	const overdue = isOverdue({ dueDate, dueTime, completed })
	const iconColor = overdue ? 'text-red-500' : 'text-gray-500'
	const dateClass = clsx('text-xs font-light text-gray-500 flex items-center', {
		'text-red-500': overdue,
	})

	return (
		<div className='flex items-center gap-1 mt-3 group/button'>
			<CalendarIcon className={iconColor} />
			<p className={dateClass }>Due date:</p>
			<p className={`${dateClass} font-medium`}>
				{formattedDateTime(dueDate, false)}
			</p>
			{dueTime && <p className={`${dateClass} font-medium`}>{dueTime}</p>}

			{onClear && (
				<button
					onClick={onClear}
					className='text-xs text-gray-500 transition-all border rounded-sm opacity-0 cursor-pointer pointer-events-none p-0.5 border-dark-gray hover:bg-red-400 hover:text-white group-hover/button:pointer-events-auto group-hover/button:opacity-100 hover:border-transparent'
				>
					Clear
				</button>
			)}
		</div>
	)
}

export default DueInfo
