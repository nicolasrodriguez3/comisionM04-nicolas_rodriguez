export const ShareIcon = ({ size, height, width }) => (
	<svg
		width={size || width || "1em"}
		height={size || height || "1em"}
		viewBox="0 0 14 14"
		xmlns="http://www.w3.org/2000/svg">
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle
				cx="2.75"
				cy="7"
				r="2.25"></circle>
			<circle
				cx="11.25"
				cy="11.25"
				r="2.25"></circle>
			<circle
				cx="11.25"
				cy="2.75"
				r="2.25"></circle>
			<path d="m4.76 6l4.48-2.25M4.76 8l4.48 2.25"></path>
		</g>
	</svg>
)
