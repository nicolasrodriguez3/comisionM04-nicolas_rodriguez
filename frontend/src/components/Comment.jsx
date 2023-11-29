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

function Comment({ text }) {
	return (
		<div className="flex gap-2 w-full pb-2 ">
			<div className="">
				<Avatar
					radius="full"
					src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
				/>
			</div>
			<div className="flex flex-col items-start grow">
				<time className="text-small text-default-400">1 day ago</time>
				<p className="text-small  text-foreground">
					<span className="font-medium mr-1">USUARIO</span>
					{text}
				</p>
			</div>
			<div>
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
							endContent={<EraseIcon size={24} />}>
							Borrar
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	)
}
export default Comment

Comment.propTypes = {
	text: PropTypes.string.isRequired,
}
