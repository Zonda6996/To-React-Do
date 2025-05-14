function DropdownLink({ onClick, children, icon }) {
	return (
		<li
			onClick={onClick}
			className='flex items-center w-full py-2 pl-3 mr-10 space-x-2 text-sm rounded-md cursor-pointer hover:bg-light-gray text-dark-white'
		>
			{icon && <span>{icon}</span>}
			<span>{children}</span>
		</li>
	)
}

export default DropdownLink
