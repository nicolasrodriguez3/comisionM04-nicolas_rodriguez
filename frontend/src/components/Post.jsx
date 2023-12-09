import {
	Avatar,
	AvatarGroup,
	Button,
	Input,
	Card,
	CardHeader,
	CardFooter,
	Image,
	CardBody,
	Divider,
} from "@nextui-org/react"
import { HeartIcon } from "../assets/HeartIcon"
import Comment from "./Comment"
import { AirplaneIcon } from "../assets/AirplaneIcon"
import LocationIcon from "../assets/LocationIcon"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-toastify"

const API_URL = import.meta.env.VITE_API_URL

const updateComments = ({ id, token }) => {
	return axios
		.get(`${API_URL}/comments/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((response) => response.data)
		.catch((err) => console.log(err))
}

function Post({ id, description, imageUrl, location, likes, comments, createdBy }) {
	const [postComments, setPostComments] = useState(comments)
	const [postLikes, setPostLikes] = useState(likes)
	const { token, user } = useAuth()
	const [comment, setComment] = useState("")
	const [loading, setLoading] = useState(false)

	const handleAddComment = async (e) => {
		e.preventDefault()
		// si no hay usuario logueado salir
		if (!user) return

		//si no hay comentario
		if(comment.trim() === "") return 

		setLoading(true)
		try {
			await axios.post(
				`${API_URL}/comments/${id}`,
				{
					content: comment,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			//update comments
			setPostComments(await updateComments({ id, token }))
		} catch (err) {
			console.error(err)
		} finally{
			setLoading(false)
		}
	}

	const handleDeleteComment = async (commentId) => {
		try {
			await toast.promise(
				axios.delete(`${API_URL}/comments/${commentId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			{
				pending: "Eliminando comentario",
				success: "Comentario eliminado 🙌",
				error: "Error al eliminar el comentario 🙁"
			})

			//update comments
			setPostComments(await updateComments({id, token}))
		} catch (err) {
			console.error(err)
			toast.error("Error al eliminar el comentario")
		}
	}

	const handleLike = async () => {
		try {
      const updatedPost = await axios.post(`${API_URL}/like/${id}`, {}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

      //todo Actualiza la información del post después de dar like
			setPostLikes(updatedPost.data.likes)
    } catch (error) {
      console.error('Error al manejar el like del post', error);
    }
	}

	return (
		<>
			<Card className="flex flex-col bg-slate-50 dark:bg-gray-900 w-full">
				{imageUrl && (
					<Image
						removeWrapper
						radius="none"
						loading="lazy"
						alt="Card background"
						className="z-0 w-full h-full object-cover max-h-[600px]"
						src={imageUrl}
					/>
				)}
				<CardHeader className="flex gap-4 items-center">
					<Avatar
						isBordered
						radius="full"
						size="md"
						showFallback
						name={createdBy.name}
						src={`${API_URL}/files${createdBy.imageUrl}`}
					/>
					<div className="flex flex-col gap-1 items-start justify-center">
						<h4 className="text-small font-semibold leading-none text-default-600">
							{createdBy.name}
						</h4>
						<h5 className="text-small tracking-tight text-default-400 flex items-center ">
							<LocationIcon /> {location}
						</h5>
					</div>
				</CardHeader>
				<CardBody className="flex flex-col items-start gap-4 pt-1">
					<p>{description}</p>

					<div className="flex justify-start gap-2">
						<div className="flex gap-2 mr-2">
							<Button color="secondary" size="sm" startContent={<HeartIcon size={24} />}
							onClick={handleLike}>
								Like
							</Button>
							<Button color="default" size="sm" startContent={<AirplaneIcon size={20} />}>
								Compartir
							</Button>
						</div>
						<AvatarGroup
							max={3}
							total={postLikes.length || 0}
							size="sm"
							renderCount={(count) => (
								<p className="text-small font-medium text-foreground ms-1">{count > 1 ? `${count} likes` : `${count} like`}</p>
							)}>
							{
								postLikes.map(post => {
									return <Avatar key={post.id} src={`${API_URL}/files${post.imageUrl}`} title={post.name} />

								})
							}
						</AvatarGroup>
					</div>
				</CardBody>
				<CardFooter className="flex flex-col items-start gap-2">
					<section className="w-full flex flex-col gap-2">
						<h4 className="text-small font-semibold leading-none text-default-600">Comentarios</h4>
						<Divider />
						{postComments.map((comment) => (
							<Comment key={comment.id} handleDelete={handleDeleteComment} {...comment} />
						))}
					</section>
					<form className="flex gap-2 w-full" onSubmit={handleAddComment}>
						<Input
							type="text"
							placeholder="Comenta algo"
							classNames={{ inputWrapper: "h-auto" }}
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button color="primary" type="submit" isDisabled={!user } isLoading={loading}>
							Comentar
						</Button>
					</form>
				</CardFooter>
			</Card>
		</>
	)
}
export default Post
