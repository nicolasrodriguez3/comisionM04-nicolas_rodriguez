import { Avatar, Badge, Button } from "@nextui-org/react"
import { useAuth } from "../hooks/useAuth"
import MySkeleton from "../components/MySkeleton"
import { CameraIcon } from "../assets/CameraIcon"

function Profile() {
	const { user } = useAuth()
	return (
		<main className="flex flex-col items-center w-full gap-2">
			<Badge
				className="mt-4 px-0"
				content={
					<Button isIconOnly radius="full" color="primary">
						<CameraIcon />
					</Button>
				}>
					<Avatar
						src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
						alt="Profile"
						className="w-40 h-40"
						r
					/>
			</Badge>
			<h1 className="font-semibold text-xl text-center">{user?.name}</h1>
			<p className="text-center text-gray-600 dark:text-gray-400">
				Miembro desde {user?.createdAt}
			</p>
		</main>
	)
}
export default Profile
