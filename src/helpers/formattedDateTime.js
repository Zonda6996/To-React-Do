export function formattedDateTime(date, showTime = true) {
	if (!date) return ''

	const options = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		...(showTime && {
			hour: '2-digit',
			minute: '2-digit',
		}),
	}

	const formattedDate = new Date(date).toLocaleString('ru-RU', options)
	return formattedDate
}