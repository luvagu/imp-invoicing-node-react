import { Link, useRouteMatch } from 'react-router-dom'

import { ReactComponent as Icon } from '../assets/imp-icon.svg'

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
                    <SidebarLink close={close} to='/' label='Panel' icon='homeIcon' active={true} />
                    <SidebarLink close={close} to='/nueva-factura' label='Factura' icon='addIcon' />
                    <SidebarLink close={close} to='/nueva-proforma' label='Proforma' icon='addIcon' />
                    <SidebarLink close={close} to='/buscar-documentos' label='Buscar Documentos' icon='searchIcon' />
                    <SidebarLink close={close} to='/buscar-productos' label='Buscar Productos' icon='viewIcon' />
				</nav>
			</div>
		</>
	)
}

// Custom router link
function SidebarLink({ label, icon, to, active, close }) {
	const match = useRouteMatch({
		path: to,
		exact: active,
	})

	const styleProps = {
		normal: 'flex items-center mt-4 py-2 px-6 text-gray-400 hover:bg-black hover:bg-opacity-25 hover:text-gray-300',
		active: 'flex items-center mt-4 py-2 px-6 bg-black bg-opacity-25 text-white',
		homeIcon: `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>`,
		addIcon: `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>`,
		searchIcon: `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
        </svg>`,
		viewIcon: `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>`
	}

	return (
		<Link onClick={close} to={to} className={match ? styleProps.active : styleProps.normal}>
            <div dangerouslySetInnerHTML={{ __html: styleProps[icon] }} />
			<span className="mx-3">{label}</span>
		</Link>
	)
}
