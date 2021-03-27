import { Link, useRouteMatch } from 'react-router-dom'
import { SvgDocAdd, SvgDocSearch, SvgHome, SvgGrid } from '../icons'

export default function SidebarLink({ label, icon, to, active, close }) {
	const match = useRouteMatch({
		path: to,
		exact: active,
	})

	const linkStyle = {
		normal: 'flex items-center mt-4 py-2 px-6 text-gray-400 hover:bg-black hover:bg-opacity-25 hover:text-gray-300',
		active: 'flex items-center mt-4 py-2 px-6 bg-black bg-opacity-25 text-white',
		home: <SvgHome />,
		docAdd: <SvgDocAdd />,
		docSearch: <SvgDocSearch/>,
		grid: <SvgGrid />,
	}

	return (
		<Link onClick={close} to={to} className={match ? linkStyle.active : linkStyle.normal}>
            {linkStyle[icon]}
			<span className="mx-3">{label}</span>
		</Link>
	)
}
