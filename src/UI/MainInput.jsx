import { motion } from 'framer-motion'

function MainInput({ onChange, value, placeholder }) {
	return (
		<motion.input
			key={placeholder}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ duration: 0.2 }}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			type='text'
			className='w-[500px] bg-gray-200 border-r-0 rounded-l-2xl py-2.5 px-3 pr-27 focus:outline-1 focus:outline-gray-700 duration-300 focus:from-gray-400 active:outline-0 transition-colors bg-gradient-to-r from-gray-200 to-gray-300 via-30% via-gray-200 shadow-lg peer'
		/>
	)
}

export default MainInput
