export function calculateElapsedTime(date) {
	const now = new Date()
	const elapsedMillis = now - date

	const seconds = Math.floor(elapsedMillis / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	if (days > 0) {
		return `hace ${days} día${days === 1 ? "" : "s"}`
	} else if (hours > 0) {
		return `hace ${hours} hora${hours === 1 ? "" : "s"}`
	} else if (minutes > 0) {
		return `hace ${minutes} minuto${minutes === 1 ? "" : "s"}`
	} else {
		return `hace unos segundos`
	}
}
