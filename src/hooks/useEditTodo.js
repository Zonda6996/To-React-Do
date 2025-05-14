import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodoName } from "../features/todos/todosSlice";

export default function useEditTodo() {
	const [editingId, setEditingId] = useState(null)
	const [newName, setNewName] = useState('')
	const inputRef = useRef(null)
	const dispatch = useDispatch()

	useEffect(() => {
		if (editingId && inputRef.current) inputRef.current.focus()
	}, [editingId])

	function handleEditClick(todo) {
		setEditingId(todo.id)
		setNewName(todo.name)
	}

	function handleChange(e) {
		setNewName(e.target.value)
	}

	function handleSave(id) {
		if (!newName.trim()) {
			dispatch(deleteTodo(id))
		}

		dispatch(updateTodoName({ id, name: newName }))
		setEditingId(null)
		setNewName('')
	}

	function handleCancel() {
		setEditingId(null)
		setNewName('')
	}

	function handleKeyDown(e, id) {
		if (e.key === 'Enter') handleSave(id)

		if (e.key === 'Escape') handleCancel()
	}

	return {
		editingId,
		newName,
		inputRef,
		handleEditClick,
		handleChange,
		handleSave,
		handleCancel,
		handleKeyDown
	}
}