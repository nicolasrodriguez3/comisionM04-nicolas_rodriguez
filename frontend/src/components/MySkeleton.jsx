import { Skeleton } from "@nextui-org/react"
import PropTypes from "prop-types"
import { useAuth } from "../hooks/useAuth"

function MySkeleton({children, className}) {
	const { loading } = useAuth()
	return (
		<Skeleton isLoaded={!loading} className={className}>{children}</Skeleton>
	)
}
export default MySkeleton

MySkeleton.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
}