import DropdownLink from './DropdownLink'

function Dropdown({ title, options, onSelect }) {
	return (
		<ul className='px-1 py-1 rounded-md bg-dark-gray'>
			<p className='py-1 pl-3 text-dark-white border-b-1'>{title}</p>

			{options.map(opt => (
				<DropdownLink
					key={opt.value}
					icon={opt.icon}
					onClick={() => onSelect(opt.value)}
				>
					{opt.label}
				</DropdownLink>
			))}
		</ul>
	)
}

export default Dropdown
