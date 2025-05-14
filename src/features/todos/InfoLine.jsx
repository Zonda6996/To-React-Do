function InfoLine({ icon: Icon, label, value, className = '' }) {
	return (
		<p
			className={`text-xs font-light text-gray-500 flex items-center gap-1 ${className}`}
		>
			<Icon className='w-4 h-4 text-gray-500' />
			{label}:&nbsp;
			<span className='font-medium'>{value}</span>
		</p>
	)
}

export default InfoLine
