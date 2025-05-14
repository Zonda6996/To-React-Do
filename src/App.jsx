import AddTodoForm from './features/todos/AddTodoForm'
import TodoList from './features/todos/TodoList'
import TodoListHeader from './features/todos/TodoListHeader'

function App() {
	return (
		<div className='px-3 py-5 mx-auto mb-10 rounded-md shadow-md h-svh mt max-w-1/2 bg-gray-50'>
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
