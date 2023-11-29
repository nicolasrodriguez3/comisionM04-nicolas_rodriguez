import { createContext, useState } from "react"

// Create the AuthContext
export const AuthContext = createContext()

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null)

	const contextValue = {}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
