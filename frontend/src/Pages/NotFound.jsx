import { Link } from "@nextui-org/react"

function NotFound() {
	return (
		<main className="text-white relative">
			<div className="w-full min-h-screen bg-[url('/avion-sobrevolando.jpg')]">
				<div className="w-full min-h-screen bg-black/30 flex flex-col justify-center items-center ">
					<div className="flex gap-4 items-center">
						<p>Upss, página no encontrada</p>
						<hr className="h-12 border" />
						<h1 className="text-4xl">404</h1>
					</div>
					<Link
						href="/"
						className="text-white underline ">
						Ir a inicio
					</Link>
				</div>
			</div>
			<a
				className="text-xs absolute bottom-4 w-full text-center"
				href="https://www.freepik.es/foto-gratis/fotograma-completo-cloudscape-avion-sobrevolando_1120708.htm#query=plane&position=43&from_view=search&track=sph&uuid=c27f8033-3170-4e75-8c1f-405ca3f46ff9">
				Imagen de fanjianhua en Freepik
			</a>
		</main>
	)
}
export default NotFound
