import { useDispatch } from 'react-redux'
import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { setFilter, setSort } from './todosSlice'
import { SORT_OPTIONS, FILTER_OPTIONS } from '../../constants/filters'
import FilterIcon from '../../images/icons/filter.svg?react'
import SortIcon from '../../images/icons/sort.svg?react'
import Dropdown from '../../UI/Dropdown'

function TodoFiltration() {
	const dispatch = useDispatch()
	const [sortOpen, setSortOpen] = useState(false)
	const [filterOpen, setFilterOpen] = useState(false)
	const wrapperRef = useRef(null)

	const handleSort = useCallback(
		type => {
			dispatch(setSort(type))
			setSortOpen(false)
		},
		[dispatch]
	)

	const handleFilter = useCallback(
		type => {
			dispatch(setFilter(type))
			setFilterOpen(false)
		},
		[dispatch]
	)

	function toggleSortMenu() {
		setFilterOpen(false)
		setSortOpen(prev => !prev)
	}

	function toggleFilterMenu() {
		setSortOpen(false)
		setFilterOpen(prev => !prev)
	}

	useEffect(() => {
		function handleClickOutside(e) {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setFilterOpen(false)
				setSortOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	return (
		<>
			<div ref={wrapperRef} className='flex items-center gap-2'>
				<button className='cursor-pointer' onClick={toggleSortMenu}>
					<SortIcon
						className='w-6 h-6 transition-colors hover:text-gray-500'
						style={{ fill: 'currentColor' }}
					/>
				</button>

				<button className='cursor-pointer' onClick={toggleFilterMenu}>
					<FilterIcon
						className='w-6 h-6 transition-colors hover:text-gray-500'
						style={{ fill: 'currentColor' }}
					/>
				</button>

				{sortOpen && (
					<div className='absolute top-0 z-50 shadow-lg right-15'>
						<Dropdown
							title='Sort by'
							options={SORT_OPTIONS}
							onSelect={handleSort}
						/>
					</div>
				)}
			</div>

			{filterOpen && (
				<div className='absolute top-0 z-50 shadow-lg right-15'>
					<Dropdown
						title='Filter'
						options={FILTER_OPTIONS}
						onSelect={handleFilter}
					/>
				</div>
			)}
		</>
	)
}

export default memo(TodoFiltration)
