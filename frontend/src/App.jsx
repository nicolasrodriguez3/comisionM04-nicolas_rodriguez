import { useState } from "react"
import Post from "./components/Post"
import NavbarApp from "./components/Navbar"
import { NextUIProvider } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

function App() {
	const navigate = useNavigate()
	return (
		<NextUIProvider navigate={navigate}>
			<NavbarApp />
			<main className="max-w-3xl mx-auto flex flex-col gap-4 my-8">
				<Post />
				<Post />
			</main>
		</NextUIProvider>
	)
}

export default App
