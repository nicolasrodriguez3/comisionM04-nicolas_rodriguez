import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Input, Button } from "@nextui-org/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon"
import { EyeFilledIcon } from "../assets/EyeFilledIcon"
import { useAuth } from "../hooks/useAuth"

function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const [isRegister, setIsRegister] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const { login, register, error } = useAuth()


	useEffect(() => {
		location.pathname === "/registro" ? setIsRegister(true) : setIsRegister(false)
		formik.setTouched({
			name: false,
			email: false,
			password: false,
		})
	}, [location])

	const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible)
	const title = isRegister ? "Registrate" : "Iniciar sesión"




	const initialValues = () => ({
					name: "",
					email: "",
					password: "",
				})

	const validationSchema = () =>
		!isRegister
			? Yup.object({
					email: Yup.string().email("Email inválido").required("Requerido"),
					password: Yup.string().required("Requerido"),
			  })
			: Yup.object({
					name: Yup.string().required("Ingrese su nombre"),
					email: Yup.string().email("Email inválido").required("Requerido"),
					password: Yup.string().required("Requerido"),
				})

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: validationSchema(),
		onSubmit: async (values) => {
			const action = isRegister ? register : login

			const user = await action(values)
			console.log(user)
			if (user) {
				navigate("/")
			}
		},
	})

	return (
		<div>
			<form className="max-w-md mx-auto flex flex-col gap-4 bg-slate-50 dark:bg-gray-900 text-gray-950 p-4 py-8 rounded-xl">
				<h2 className="text-gray-950 text-xl mb-4">{title} 🛫</h2>
				{isRegister && (
					<Input
						label="Nombre"
						name="name"
						onChange={formik.handleChange}
						{...formik.getFieldProps("name")}
						value={formik.values.name}
						isInvalid={formik.touched.name && formik.errors.name}
						errorMessage={formik.errors.name}
						color={formik.touched.name && formik.errors.name && "danger"}
						variant="bordered"
					/>
				)}
				<Input
					label="Email"
					name="email"
					type="email"
					value={formik.values.email}
					{...formik.getFieldProps("email")}
					isInvalid={formik.touched.email && formik.errors.email}
					color={formik.touched.email && formik.errors.email ? "danger" : "default"}
					variant="bordered"
				/>
				<Input
					variant="bordered"
					label="Contraseña"
					name="password"
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
							{isPasswordVisible ? (
								<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							)}
						</button>
					}
					type={isPasswordVisible ? "text" : "password"}
					value={formik.values.password}
					isInvalid={formik.touched.password && formik.errors.password}
					color={formik.touched.password && formik.errors.password ? "danger" : "default"}
					{...formik.getFieldProps("password")}
				/>
				<div className="flex items-center gap-3 mt-4">
					<Button type="submit" onClick={formik.handleSubmit}>
						{title}
					</Button>
					{isRegister ? (
						<Link to="/iniciar-sesion" className="text-primary-400 font-semibold">
							¡Ya tengo cuenta!
						</Link>
					) : (
						<Link to="/registro" className="text-primary-400 font-semibold">
							No estoy registrado 🙁
						</Link>
					)}
				</div>
			{error && <p className="text-danger-500 p-4 rounded-xl border border-danger-500">Error: {error}</p>}
			</form>
		</div>
	)
}
export default Login
