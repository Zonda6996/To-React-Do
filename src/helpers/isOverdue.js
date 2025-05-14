export function isOverdue(todo) {
	if (todo.completed || !todo.dueDate) return false

	const now = new Date()
	const dueDateTime = new Date(`${todo.dueDate}T${todo.dueTime}` || '23:59')

	return now > dueDateTime
}