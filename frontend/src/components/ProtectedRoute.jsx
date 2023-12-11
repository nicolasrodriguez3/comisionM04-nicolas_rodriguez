import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = ({ redirectPath = "/", children }) => {
	const { user } = useAuth()
	if (!user) {
		return (
			<Navigate
				to={redirectPath}
				replace
			/>
		)
	}

	return children ? children : <Outlet />
}
