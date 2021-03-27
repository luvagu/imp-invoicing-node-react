import { memo } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import { ReactComponent as Icon } from '../assets/imp-icon.svg'
import { SvgDocAdd, SvgDocSearch, SvgHome, SvgGrid } from '../icons'

export default memo(function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const close = () => {
		setSidebarOpen(false)
	}
	
	return (
		<>
			<div onClick={close} className={sidebarOpen ? 'fixed z-20 inset-0 bg-black opacity-50 transition-opacity' : 'hidden'}></div>

			<div className={`fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-indigo-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
				<div className="flex items-center justify-center mt-8">
					<div className="flex items-center">
						<Icon className="h-10 w-10" />
						<span className="text-white text-2xl mx-2 font-semibold">
							IMP F&amp;P
						</span>
					</div>
				</div>

				<nav className="mt-10">
                    <SidebarLink close={close} to='/' label='Panel' icon='home' active={true} />
                    <SidebarLink close={close} to='/nuevo-egreso' label='Egreso' icon='docAdd' />
                    <SidebarLink close={close} to='/nueva-factura' label='Factura' icon='docAdd' />
                    <SidebarLink close={close} to='/nueva-proforma' label='Proforma' icon='docAdd' />
                    <SidebarLink close={close} to='/buscar-documentos' label='Buscar Documentos' icon='docSearch' />
                    <SidebarLink close={close} to='/buscar-productos' label='Buscar Productos' icon='grid' />
				</nav>
			</div>
		</>
	)
})

// Custom router link
function SidebarLink({ label, icon, to, active, close }) {
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
