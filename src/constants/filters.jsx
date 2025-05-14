import NewestIcon from '../images/icons/newestSort.svg?react'
import OldestIcon from '../images/icons/oldestSort.svg?react'
import PriorityIcon from '../images/icons/prioritySort.svg?react'
import DueDateIcon from '../images/icons/dueDate.svg?react'
import AlphabetIcon from '../images/icons/alphabetSort.svg?react'
import AllTasksIcon from '../images/icons/allTasks.svg?react'
import CompletedIcon from '../images/icons/completed.svg?react'
import ActiveIcon from '../images/icons/active.svg?react'

export const SORT_OPTIONS = [
	{ label: 'Newest', value: 'newest', icon: <NewestIcon /> },
	{ label: 'Oldest', value: 'oldest', icon: <OldestIcon /> },
	{ label: 'Priority', value: 'priority', icon: <PriorityIcon /> },
	{ label: 'Due date', value: 'dueDate', icon: <DueDateIcon /> },
	{ label: 'Alphabetically', value: 'alphabetically', icon: <AlphabetIcon /> },
]

export const FILTER_OPTIONS = [
	{ label: 'All', value: 'all', icon: <AllTasksIcon /> },
	{ label: 'Acitve', value: 'active', icon: <ActiveIcon /> },
	{ label: 'Completed', value: 'completed', icon: <CompletedIcon /> },
]
