import { useState } from "react"
import Post from "./components/Post"
import NavbarApp from "./components/Navbar"
import { NextUIProvider } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

function App() {
	const navigate = useNavigate()
	const [card, setCard] = useState(false)
	return (
		<NextUIProvider navigate={navigate}>
			<NavbarApp />
			<button onClick={() => setCard(!card)}>Toggle Card</button>
			<main className="max-w-3xl mx-auto">{card && <Post />}</main>
		</NextUIProvider>
	)
}

export default App

