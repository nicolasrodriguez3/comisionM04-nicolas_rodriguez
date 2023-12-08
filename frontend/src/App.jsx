import { NextUIProvider } from "@nextui-org/react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const navigate = useNavigate()
	
	return (
		<NextUIProvider navigate={navigate}>
			<AuthProvider>
			<ToastContainer />
			<Routes>
				<Route
					path="/iniciar-sesion"
					element={<Login />}
				/>
				<Route
					path="/registro"
					element={<Login />}
				/>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/perfil/:id"
					element={<Profile />}
				/>

			</Routes>
			
				
			</AuthProvider>
		</NextUIProvider>
	)
}

export default App
