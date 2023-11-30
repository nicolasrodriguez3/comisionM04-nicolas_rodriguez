import axios from "axios"
import { createContext, useEffect, useState } from "react"

// Create the AuthContext
export const AuthContext = createContext()

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)

		const token = JSON.parse(localStorage.getItem("token"))
		if (!token) {
			setLoading(false)
			return
		}

		setToken(token)
		axios
			.get("http://localhost:3001/api/users/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setUser(res.data)
			})
			.catch((err) => {
				console.log(err)
				setError("Ocurrió un error, intenta nuevamente")
			})

		setLoading(false)
	}, [token])

	const login = async ({ email, password }) => {
		return axios
			.post("http://localhost:3001/api/login", { email, password })
			.then((res) => {
				console.log(res.data)
				setUser(res.data.user)
				const { token } = res.data
				localStorage.setItem("token", JSON.stringify(token))
				setToken(token)
				return res.data.user
			})
			.catch((err) => {
				console.log(err)
				if (err.response.status === 401) {
					setError("Usuario o contraseña incorrectos")
				} else {
					setError("Ocurrió un error, intenta nuevamente")
				}
			})
	}

	const register = async ({ name, email, password }) => {
		return axios
			.post("http://localhost:3001/api/register", { name, email, password })
			.then((res) => {
				setUser(res.data.user)
				const { token } = res.data
				localStorage.setItem("token", JSON.stringify(token))
				setToken(token)

				return res.data
			})
			.catch((err) => {
				console.log(err)
				setError("Ocurrió un error, intenta nuevamente")
			})
	}

	const logout = async () => {
		setToken(null)
		// borrar token de localStorage
		localStorage.removeItem("token")
	}

	const contextValue = {
		login,
		register,
		logout,
		error,
		user,
		token,
		loading,
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
