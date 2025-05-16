import { useDispatch } from 'react-redux'
import CalendarIcon from '../images/icons/calendar.svg?react'
import TimeIcon from '../images/icons/time.svg?react'
import { setDueDate, setDueTime } from '../features/todos/todosSlice'
import { memo, useEffect, useState } from 'react'

const DatePicker = memo(function DatePicker({ todo }) {
	const dispatch = useDispatch()
	const [timeError, setTimeError] = useState('')

	function handleChangeDueDate(e) {
		dispatch(setDueDate({ id: todo.id, dueDate: e.target.value }))
	}

	function handleChangeDueTime(e) {
		if (!todo.dueDate.trim()) {
			setTimeError('Please select a date first.')
			return
		}
		dispatch(setDueTime({ id: todo.id, dueTime: e.target.value }))
	}

	useEffect(() => {
		if (timeError) {
			const timeout = setTimeout(() => setTimeError(''), 4000)
			return () => clearTimeout(timeout)
		}
	}, [timeError])

	return (
		<>
			<div className='flex gap-8 pb-2 pr-4'>
				<div className='relative'>
					<div className='absolute top-0 left-0 w-5 h-5 group/input'>
						<CalendarIcon className='absolute top-0 left-0 w-full h-full transition-colors group-hover/input:text-gray-500' />
						<input
							type='date'
							className='box-border absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer custom-datepicker-icon'
							onChange={e => handleChangeDueDate(e)}
						/>
					</div>
				</div>

				<div className='relative mb-3'>
					<div className='absolute top-0 left-0 w-5 h-5 group/input'>
						<TimeIcon className='absolute top-0 left-0 w-full h-full transition-colors rounded-sm group-hover/input:text-gray-500' />
						<input
							type='time'
							className='box-border absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer custom-datepicker-icon '
							onChange={e => handleChangeDueTime(e)}
						/>
					</div>
				</div>
			</div>
			{timeError && (
				<p className='absolute text-sm font-light text-red-500 bottom-1'>
					{timeError}
				</p>
			)}
		</>
	)
})

export default DatePicker
