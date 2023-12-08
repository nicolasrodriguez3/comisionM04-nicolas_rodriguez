import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react"
import { PropTypes } from "prop-types"
import { VerticalDotsIcon } from "../assets/VerticalDotsIcon"
import { EraseIcon } from "../assets/EraseIcon"
import { EditIcon } from "../assets/EditIcon"
import { calculateElapsedTime } from "../utils/calculateElapsedTime"
import { useAuth } from "../hooks/useAuth"


const API_URL = import.meta.env.VITE_API_URL

function Comment({ id: postId, userId, content, createdAt, handleDelete }) {
	const date = new Date(createdAt)
	const { user } = useAuth()

	return (
		<div className="flex gap-2 w-full pb-2 ">
			<div className="">
				<Avatar
					radius="full"
					showFallback
					name={userId.name}
					src={`${API_URL}/files${userId.imageUrl}`}
				/>
			</div>
			<div className="flex flex-col items-start grow">
				<time
					className="text-small text-default-400"
					title={date.toLocaleString()}>
					{calculateElapsedTime(date)}
				</time>
				<p className="text-small  text-foreground">
					<span className="font-medium mr-1">{userId.name}</span>
					{content}
				</p>
			</div>
			<div>
				{user?.id === userId.id && (
				<Dropdown>
					<DropdownTrigger>
						<Button
							color="default"
							className="bg-transparent"
							isIconOnly>
							<VerticalDotsIcon />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Acciones del comentario">
								
						<DropdownItem
							key="edit"
							endContent={<EditIcon size={24} />}>
							Editar
						</DropdownItem>
						<DropdownItem
							key="delete"
							className="text-danger"
							color="danger"
							endContent={<EraseIcon size={24} />}
							onClick={() => handleDelete(postId)}
							>
							Borrar
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				)}
			</div>
		</div>
	)
}
export default Comment

Comment.propTypes = {
	content: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	userId: PropTypes.shape({
		name: PropTypes.string.isRequired,
		imageUrl: PropTypes.string,
	}),
}
