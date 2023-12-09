import { Input, Textarea } from "@nextui-org/react"
import { useState } from "react"
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

function NewPost() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const formik = useFormik({
		initialValues: {
			image: null,
			description: "",
			location: "",
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2));
		},
	})
	const {values} = formik

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		formik.setFieldValue("image", file)
	}

	const handleNewPost = (e) => {
		e.preventDefault()
		alert("post creado")
		
	}

	return (
		<>
			<Button onPress={onOpen}>Agregar publicación</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Nueva publicación</ModalHeader>
							<form onSubmit={handleNewPost}>
								<ModalBody>
									<input type="file" accept="image/*" onChange={handleFileChange}  />
									{values.image && (
										<div>
											<img src={URL.createObjectURL(values.image)} alt="Vista previa" />
										</div>
									)}
									<Textarea label="Description" placeholder="Descripción" isRequired
									isInvalid={formik.errors.description && formik.touched.description}
										{...formik.getFieldProps("description")}
									></Textarea>
									<Input name="location" label="Ubicación" isRequired {...formik.getFieldProps("location")}/>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Cerrar
									</Button>
									<Button type="submit" color="primary" >
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
