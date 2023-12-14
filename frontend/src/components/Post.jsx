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
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Textarea,
} from "@nextui-org/react"
import { HeartIcon } from "../assets/HeartIcon"
import Comment from "./Comment"
import { AirplaneIcon } from "../assets/AirplaneIcon"
import LocationIcon from "../assets/LocationIcon"
import { useState } from "react"
import axios from "axios"
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-toastify"
import { VerticalDotsIcon } from "../assets/VerticalDotsIcon"
import { EraseIcon } from "../assets/EraseIcon"
import { useFormik } from "formik"
import { EditIcon } from "../assets/EditIcon"

const API_URL = import.meta.env.VITE_API_URL

const updateComments = async ({ id, token }) => {
	try {
		const response = await axios.get(`${API_URL}/comments/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	} catch (err) {
		return console.log(err)
	}
}

function Post({ id, description, imageUrl, location, likes, comments, createdBy, handleDelete, handleEdit }) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const [postComments, setPostComments] = useState(comments)
	const [postLikes, setPostLikes] = useState(likes)
	const { token, user } = useAuth()
	const [comment, setComment] = useState("")
	const [loading, setLoading] = useState(false)

	const formik = useFormik({
		initialValues: {
			description,
			location,
		},
		onSubmit: async (values) => {
			handleEdit(id, values)
			onClose()
	}})

	const handleAddComment = async (e) => {
		e.preventDefault()
		// si no hay usuario logueado salir
		if (!user) return

		//si no hay comentario
		if (comment.trim() === "") return

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
			setComment("")
		} catch (err) {
			console.error(err)
		} finally {
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
					error: "Error al eliminar el comentario 🙁",
				}
			)

			//update comments
			setPostComments(await updateComments({ id, token }))
		} catch (err) {
			console.error(err)
			toast.error("Error al eliminar el comentario")
		}
	}

	const handleLike = async () => {
		try {
			const updatedPost = await axios.post(
				`${API_URL}/like/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			// Actualiza la información del post después de dar like
			setPostLikes(updatedPost.data.likes)
		} catch (error) {
			console.error("Error al manejar el like del post", error)
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
						src={`${API_URL}/files${imageUrl}`}
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
					<div className="flex flex-col gap-1 items-start justify-center grow">
						<h4 className="text-small font-semibold leading-none text-default-600">
							{createdBy.name}
						</h4>
						<h5 className="text-small tracking-tight text-default-400 flex items-center ">
							<LocationIcon /> {location}
						</h5>
					</div>
					<div>
						{user?.id === createdBy.id && (
							<Dropdown>
								<DropdownTrigger>
									<Button color="default" className="bg-transparent" isIconOnly>
										<VerticalDotsIcon />
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label="Acciones del comentario">
									<DropdownItem
										key="edit"
										endContent={<EditIcon size={24} />}
										onClick={onOpen}>
										Editar
									</DropdownItem>
									<DropdownItem
										key="delete"
										className="text-danger"
										color="danger"
										endContent={<EraseIcon size={24} />}
										onClick={() => handleDelete(id)}>
										Borrar
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						)}
					</div>
				</CardHeader>
				<CardBody className="flex flex-col items-start gap-4 pt-1">
					<p>{description}</p>

					<div className="flex justify-start gap-2">
						<div className="flex gap-2 mr-2">
							<Button
								color="secondary"
								size="sm"
								startContent={<HeartIcon size={24} />}
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
								<p className="text-small font-medium text-foreground ms-1">
									{count > 1 ? `${count} likes` : `${count} like`}
								</p>
							)}>
							{postLikes.map((post) => {
								return (
									<Avatar
										key={post.id}
										src={`${API_URL}/files${post.imageUrl}`}
										title={post.name}
									/>
								)
							})}
						</AvatarGroup>
					</div>
				</CardBody>
				<CardFooter className="flex flex-col items-start gap-2">
					<section className="w-full flex flex-col gap-2">
						{postComments.length !== 0 && (
							<>
								<h4 className="text-small font-semibold leading-none text-default-600">
									Comentarios
								</h4>
								<Divider />
							</>
						)}
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
						<Button color="primary" type="submit" isDisabled={!user} isLoading={loading}>
							Comentar
						</Button>
					</form>
				</CardFooter>
			</Card>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Editar publicación</ModalHeader>
							<form onSubmit={formik.handleSubmit}>
								<ModalBody>
									<Textarea
										label="Description"
										placeholder="Descripción"
										isInvalid={formik.errors.description && formik.touched.description}
										{...formik.getFieldProps("description")}></Textarea>
									<Input
										name="location"
										label="Ubicación"
										{...formik.getFieldProps("location")}
									/>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Cancelar
									</Button>
									<Button type="submit" color="primary">
										Guardar
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
export default Post
