import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
	Button,
} from "@nextui-org/react"
import logo from "/logo.png"
import { useAuth } from "../hooks/useAuth"

const NavbarApp = () => {
	const { user, logout } = useAuth()
	return (
		<Navbar
			isBordered
			isBlurred>
			<NavbarBrand>
				<Link
					className="flex gap-2 items-center"
					color="primary"
					href="#"
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" })
					}}>
					<img
						src={logo}
						alt="ViajesDev"
						className="w-10 h-10"
					/>
					<p className="font-bold text-inherit">ViajesDev</p>
				</Link>
			</NavbarBrand>

			<NavbarContent
				className="hidden sm:flex gap-4"
				justify="center">
				<NavbarItem>
					<Link
						href="#"
						color="foreground"
						aria-current="page">
						Agregar publicación
					</Link>
				</NavbarItem>
			</NavbarContent>
			{user ? (
				<NavbarContent
					as="div"
					justify="end">
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="default"
								name={user?.name}
								size="md"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Profile Actions"
							variant="flat">
							<DropdownItem
								textValue="Perfil"
								key="profile"
								className="h-14"
								>
									<Link href={`/perfil/${user?.id}`} className="block text-md text-foreground">
								<p>Iniciaste sesión como</p>
								<p className="font-semibold text-primary">{user?.email}</p>
									</Link>
							</DropdownItem>
							<DropdownItem
								textValue="Mis publicaciones"
								key="posts">
								Mis publicaciones
							</DropdownItem>
							<DropdownItem
								textValue="Cerrar sesión"
								key="logout"
								color="danger"
								onClick={() => {
									logout()
								}}>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			) : (
				<NavbarContent
					as="div"
					justify="end">
					<NavbarItem>
						<Link
							href="/registro"
							color="foreground">
							Registrarse
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							href="/iniciar-sesion"
							color="primary">
							Iniciar sesión
						</Button>
					</NavbarItem>
				</NavbarContent>
			)}
		</Navbar>
	)
}

export default NavbarApp
