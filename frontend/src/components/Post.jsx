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

function Post({ id, title, description, imageUrl, location, likes, comments, createdBy: user }) {
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
						src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
					/>
					<div className="flex flex-col gap-1 items-start justify-center">
						<h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
						<h5 className="text-small tracking-tight text-default-400 flex items-center ">
							<LocationIcon /> {location}
						</h5>
					</div>
				</CardHeader>
				<CardBody className="flex flex-col items-start gap-4 pt-1">
					<p>{description}</p>

					<div className="flex justify-start gap-2">
						<div className="flex gap-2 mr-2">
							<Button
								color="secondary"
								size="sm"
								startContent={<HeartIcon size={24} />}>
								Like
							</Button>
							<Button
								color="default"
								size="sm"
								startContent={<AirplaneIcon size={20} />}>
								Compartir
							</Button>
						</div>
						<AvatarGroup
							max={3}
							total={likes || 0}
							size="sm"
							renderCount={(count) => (
								<p className="text-small font-medium text-foreground ms-1">+{count} likes</p>
							)}>
							<Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
							<Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
							<Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
						</AvatarGroup>
					</div>
				</CardBody>
				<CardFooter className="flex flex-col items-start gap-2">
					<section className="w-full flex flex-col gap-2">
						<h4 className="text-small font-semibold leading-none text-default-600">Comentarios</h4>
						<Divider />
						{comments.map((comment) => (
							<Comment
								key={comment.id}
								{...comment}
							/>
						))}
					</section>
					<form className="flex gap-2 w-full">
						<Input
							type="text"
							placeholder="Comenta algo"
							classNames={{ inputWrapper: "h-auto" }}
						/>
						<Button color="primary">Comentar</Button>
					</form>
				</CardFooter>
			</Card>
		</>
	)
}
export default Post
