import { useEffect, useState } from "react"
import NavbarApp from "../components/Navbar"
import Post from "../components/Post"
import { useAuth } from "../hooks/useAuth"
import { NewPost } from "../components/NewPost"
import axios from "axios"
import { toast } from "react-toastify"

const API_URL = import.meta.env.VITE_API_URL

function Home() {
	const { user, token } = useAuth()
	const [posts, setPosts] = useState([])

	const getPosts = async () => {
		const response = await axios.get("http://localhost:3001/api/posts")
		setPosts(response.data.reverse())
		console.log(response.data)
	}

	useEffect(() => {
		getPosts()
	}, [])

	const handleDeletePost = async (id) => {
		try {
			await toast.promise(
				axios.delete(`${API_URL}/posts/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}),
				{
					pending: "Eliminando publicación",
					success: "Publicación eliminada 🙌",
					error: "Error al eliminar la publicación 🙁",
				}
			)

			//update posts
			getPosts()
		} catch (err) {
			console.error(err)
			toast.error("Error al eliminar el post")
		}
	}

	const handleEditPost = async (id, values) => {
		try {
			// Subir la imagen y obtener la URL
			await toast.promise(
				async () => {
					return await axios.put(`${API_URL}/posts/${id}`, values, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
				},
				{
					pending: "Guardando publicación",
					success: "Publicación actualizada con éxito",
					error: "Ocurrió un error al editar la publicación",
				}
			)

			getPosts()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<NavbarApp />
			<div className="max-w-2xl mt-8 mx-auto flex justify-between items-center gap-4">
				<h1 className="text-xl">Bienvenido {user?.name}</h1>
				<NewPost updatePosts={getPosts} />
			</div>
			<main className="max-w-2xl mx-auto flex flex-col gap-4 my-8">
				{posts.map((post) => (
					<Post
						key={post.id}
						{...post}
						handleDelete={handleDeletePost}
						handleEdit={handleEditPost}
					/>
				))}
			</main>
		</>
	)
}
export default Home
