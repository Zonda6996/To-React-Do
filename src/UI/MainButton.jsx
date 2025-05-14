import { motion } from 'framer-motion'

function MainButton({ label, onClick }) {
	return (
		<motion.button
			key={label}
			initial={{ opacity: 0, y: -3 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 3 }}
			transition={{ duration: 0.1 }}
			type='submit'
			onClick={onClick}
			className='w-25 px-3 py-2.5 rounded-2xl absolute right-20 top-0 bg-black uppercase font-semibold text-white cursor-pointer shadow-lg peer-focus:bg-gray-700 peer-focus:outline-gray-700 peer-focus:outline-1 hover:bg-gray-500 active:bg-gray-600 transition-all'
		>
			{label}
		</motion.button>
	)
}

export default MainButton
