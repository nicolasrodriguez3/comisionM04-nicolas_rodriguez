import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Input, Button } from "@nextui-org/react"
import { useFormik } from "formik"

function Login() {
	const [isRegister, setIsRegister] = useState(false)
	const location = useLocation()

	useEffect(() => {
		location.pathname === "/registro" ? setIsRegister(true) : setIsRegister(false)
	}, [location])

	const title = isRegister ? "Registrate" : "Iniciar sesión"

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			console.log(values)
		},
	})

	return (
		<div>
			<h2>{title}</h2>
			<form>
				<Input
					label="Email"
					name="email"
					type="email"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<Input
					label="Contraseña"
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<Button
					type="submit"
					onClick={formik.handleSubmit}>
					{title}
				</Button>
			</form>
			<Link to={isRegister ? "/iniciar-sesion" : "/registro"}>
				{isRegister ? "Iniciar sesión" : "¿No tenes cuenta? Registrate"}
			</Link>
		</div>
	)
}
export default Login
