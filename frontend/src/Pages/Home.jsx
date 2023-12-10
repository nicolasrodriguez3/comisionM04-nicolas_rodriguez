import { useEffect, useState } from "react"
import NavbarApp from "../components/Navbar"
import Post from "../components/Post"
import { useAuth } from "../hooks/useAuth"
import { NewPost } from "../components/NewPost"
import axios from "axios"


function Home() {
	const {user} = useAuth()
	const [posts, setPosts] = useState([])

	const getPosts = async () => {
		const response = await axios.get("http://localhost:3001/api/posts")
		setPosts(response.data.reverse())
		console.log(response.data)
	}

	useEffect(() => {
		getPosts()
	}, [])
	return (
		<>
			<NavbarApp />
			<h1>Bienvenido {user?.name}</h1>
		<NewPost updatePosts={getPosts} />
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
