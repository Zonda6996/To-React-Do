import AddTodoForm from './features/todos/AddTodoForm'
import TodoList from './features/todos/TodoList'
import TodoListHeader from './features/todos/TodoListHeader'

function App() {
	return (
		<div className='max-w-full px-3 py-5 mx-auto rounded-md shadow-md sm:mb-10 min-h-svh md:max-w-2/3 xl:max-w-1/2 bg-gray-50'>
			<h1 className='text-4xl font-bold text-center'>
				To
				<span className='text-xs font-semibold uppercase text-cyan-400'>
					React
				</span>
				Do
			</h1>
			<div className='mt-10'>
				<AddTodoForm />
				<TodoListHeader />
				<TodoList />
			</div>
		</div>
	)
}

export default App
