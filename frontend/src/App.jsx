import { useEffect, useState } from "react"
import Post from "./components/Post"
import NavbarApp from "./components/Navbar"
import { NextUIProvider } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

function App() {
	const navigate = useNavigate()
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const getPosts = async () => {
			const response = await fetch("http://localhost:3001/api/posts")
			const data = await response.json()
			setPosts(data)
			console.log(data)
		}
		getPosts()
	}, [])

	return (
		<NextUIProvider navigate={navigate}>
			<AuthProvider>
				<NavbarApp />
				<main className="max-w-2xl mx-auto flex flex-col gap-4 my-8">
					{posts.map((post) => (
						<Post
							key={post.id}
							{...post}
						/>
					))}
				</main>
			</AuthProvider>
		</NextUIProvider>
	)
}

export default App
