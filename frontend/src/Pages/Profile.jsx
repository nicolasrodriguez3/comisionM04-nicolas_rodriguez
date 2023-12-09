import { Avatar, Badge, Button } from "@nextui-org/react"
import { useAuth } from "../hooks/useAuth"
import { CameraIcon } from "../assets/CameraIcon"
import { useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

function Profile() {
	const { user, token, updateUserInfo } = useAuth()
	const [file, setFile] = useState(null)
	const [error, setError] = useState(null)

	const handleFile = (e) => {
		const file = e.target.files[0]
		if (!file) return
		console.log(file)
		console.log(user)
		setFile(file)
		setError(null)
	}

	const uploadFile = async () => {
		setError(null)
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)
		const response = await axios.post(`${API_URL}/files/profile/${user.id}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		})

		if (response.status !== 200) {
			throw new Error("Error al subir la imagen.")
		}

		updateUserInfo({ imageUrl: response.data.path })
	}

	const cancelUploadFile = () => {
		setFile(null)
		setError(null)
	}

	return (
		<main className="flex flex-col items-center w-full gap-2">
			<Badge
				className="mt-4 px-0"
				content={
					<Button
						as={"label"}
						isIconOnly
						radius="full"
						color="primary">
						<CameraIcon />
						<input
							type="file"
							name="file"
							id="file"
							hidden
							accept="image/*"
							onChange={handleFile}
						/>
					</Button>
				}>
				<Avatar
					src={`${API_URL}/files${user?.imageUrl}`}
					alt="Profile"
					className="w-40 h-40"
				/>
			</Badge>
			{file && (
				<div className="flex gap-2">
					<Button
						color="primary"
						onClick={uploadFile}>
						Guardar
					</Button>
					<Button onClick={cancelUploadFile}>Cancelar</Button>
				</div>
			)}
			<h1 className="font-semibold text-xl text-center">{user?.name}</h1>
			<p className="text-center text-gray-600 dark:text-gray-400">
				Miembro desde {user?.createdAt}
			</p>
		</main>
	)
}
export default Profile
