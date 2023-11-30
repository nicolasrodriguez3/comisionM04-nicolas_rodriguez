import { useEffect, useState } from "react"
import NavbarApp from "../components/Navbar"
import Post from "../components/Post"
import { useAuth } from "../hooks/useAuth"

function Home() {
	const {user} = useAuth()
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
		<>
			<NavbarApp />
			<h1>Bienvenido {user?.name}</h1>
				<main className="max-w-2xl mx-auto flex flex-col gap-4 my-8">
					{posts.map((post) => (
						<Post
							key={post.id}
							{...post}
						/>
					))}
				</main>
		</>
	)
}
export default Home
