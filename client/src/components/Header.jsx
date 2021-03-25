import { useLocation } from 'react-router-dom'

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation()
	
    let headerTitle

    switch (location.pathname) {
		case '/nuevo-egreso': headerTitle = 'Nuevo Egreso'
            break
        case '/nueva-factura': headerTitle = 'Nueva Factura'
            break
        case '/nueva-proforma': headerTitle = 'Nueva Proforma'
            break
        case '/buscar-documentos': headerTitle = 'Buscar Documentos'
            break
        case '/buscar-productos': headerTitle = 'Buscar Productos'
            break
		case '/ver-documento': headerTitle = 'Ver Documento'
            break
        default: headerTitle = 'Panel'
            break
    }

	if (location.pathname.includes('/ver-documento')) headerTitle = 'Ver Documento'

    return (
		<header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-700">
			<div className="flex items-center">
                
                {/* Sidebar toggle */}
				<button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 mr-4 focus:outline-none lg:hidden">
					<svg
						className="h-6 w-6"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 6H20M4 12H20M4 18H11"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</button>

				<h3 className="uppercase text-lg text-black font-bold">{headerTitle}</h3>
			</div>

			{/* Login & Logout buttons */}
			<div className="flex items-center">
				<button className="flex mr-4 text-gray-600 focus:outline-none" type="button" title="Ajustes">
					<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>

				<button className="flex mr-4 text-gray-600 focus:outline-none" type="button" title="Salir">
					<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
						/>
					</svg>
				</button>

				<button className="flex text-gray-600 focus:outline-none" type="button" title="Ingresar">
					<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
					</svg>
				</button>
			</div>
		</header>
	)
}
