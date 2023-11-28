import NavbarApp from "../components/Navbar"
import Post from "../components/Post"

function Home() {
	return (
		<>
			<NavbarApp />
			<main className="max-w-3xl mx-auto">{<Post />}</main>
		</>
	)
}
export default Home
