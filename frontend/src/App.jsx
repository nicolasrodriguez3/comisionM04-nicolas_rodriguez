import { NextUIProvider } from "@nextui-org/react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"

function App() {
	const navigate = useNavigate()
	return (
		<NextUIProvider navigate={navigate}>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/iniciar-sesion"
					element={<Login />}
				/>
				<Route
					path="/registro"
					element={<Login />}
				/>
			</Routes>
		</NextUIProvider>
	)
}

export default App
