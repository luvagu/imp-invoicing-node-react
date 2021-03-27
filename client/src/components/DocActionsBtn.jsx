import { Link, useLocation } from 'react-router-dom'

import { SvgDocEdit, SvgDocSave, SvgDocUpdate, SvgPlus } from '../icons'

export default function DocActionsBtn({ action, handle, title, color = 'indigo' }) {
	const self = useLocation().pathname

	return action === 'link' ? <NewDocLink to={self} title={title} /> : (
		<ActionButton
            actionIcon={action}
			handle={handle}
			title={title}
			color={color}
		/>
	)
}

function ActionButton({ actionIcon, handle, title, color }) {
	const icons = {
		edit: <SvgDocEdit className="w5- h-5" />,
		save: <SvgDocSave className="w5- h-5" />,
		update: <SvgDocUpdate className="w5- h-5" />,
	}

	return (
		<button
			className={`ml-2 p-1 text-white rounded-full bg-${color}-600 hover:bg-${color}-800 inline-flex items-center justify-center`}
			title={title}
			type="button"
			onClick={handle}
		>
			{icons[actionIcon]}
		</button>
	)
}

function NewDocLink({ to, title }) {
	return (
		<Link
			to={to}
			className="ml-2 p-1 text-white rounded-full bg-gray-500 hover:bg-gray-700 inline-flex items-center justify-center"
			title={title}
		>
			<SvgPlus className="w-5 h-5" />
		</Link>
	)
}
