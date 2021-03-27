export default function BlockEditingLayer({ isDocSaved, isDocUpdating, children }) {
	return (
		<div className="relative">
			{isDocSaved && !isDocUpdating && (
				<div className="absolute z-10 -inset-1 bg-yellow-600 opacity-25 transition-opacity cursor-not-allowed"></div>
			)}
			{children}
		</div>
	)
}
