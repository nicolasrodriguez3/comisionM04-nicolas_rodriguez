import { Image, Input, Textarea } from "@nextui-org/react"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react"
import { useFormik } from "formik"
import { EraseIcon } from "../assets/EraseIcon"
import axios from "axios"
import { useAuth } from "../hooks/useAuth"
import { toast } from "react-toastify"
const API_URL = import.meta.env.VITE_API_URL

const uploadImage = async (file, token) => {
	try {
		const formData = new FormData()
		formData.append("file", file)

		const response = await axios.post(`${API_URL}/files/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		})

		return response.data
	} catch (error) {
		throw new Error("Error uploading image")
	}
}

function NewPost({ updatePosts }) {
	const { token } = useAuth()
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const formik = useFormik({
		initialValues: {
			image: null,
			description: "",
			location: "",
		},
		onSubmit: async (values) => {
			console.log(values)

			try {
				// Subir la imagen y obtener la URL
				const createdPost = await toast.promise(
					async () => {
						const imageInfo = await uploadImage(values.image, token)

						const postData = {
							...values,
							imageUrl: imageInfo.path,
						}

						return await axios.post(`${API_URL}/posts`, postData, {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
					},
					{
						pending: "Creando publicación",
						success: "Publicación creada con éxito",
						error: "Ocurrió un error al crear la publicación",
					}
				)

				console.log(createdPost)
				updatePosts()
			} catch (error) {
				console.error(error)
			} finally {
				onClose()
			}
		},
	})
	const { values } = formik

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		formik.setFieldValue("image", file)
	}

	return (
		<>
			<Button
				onPress={onOpen}
				color="primary">
				Agregar publicación
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				backdrop="blur">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Nueva publicación</ModalHeader>
							<form onSubmit={formik.handleSubmit}>
								<ModalBody>
									{!values.image ? (
										<input
											type="file"
											accept="image/*"
											onChange={handleFileChange}
											required
										/>
									) : (
										<div className="relative flex justify-center">
											<Image
												src={URL.createObjectURL(values.image)}
												alt="Vista previa"
												className="max-h-96"
											/>
											<Button
												isIconOnly
												radius="full"
												color="danger"
												className="absolute right-2 top-1 z-10"
												onClick={() => formik.setFieldValue("image", null)}>
												<EraseIcon />
											</Button>
										</div>
									)}
									<Textarea
										label="Descripción"
										isRequired
										isInvalid={formik.errors.description && formik.touched.description}
										{...formik.getFieldProps("description")}></Textarea>
									<Input
										name="location"
										label="Ubicación"
										isRequired
										{...formik.getFieldProps("location")}
									/>
								</ModalBody>
								<ModalFooter>
									<Button
										color="danger"
										variant="light"
										onPress={onClose}>
										Cerrar
									</Button>
									<Button
										type="submit"
										color="primary">
										Crear publicación
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
export { NewPost }
