import { useLocation } from 'react-router-dom'

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation().pathname
    let headerTitle
    
    switch (location) {
        case '/nueva-factura': headerTitle = 'Nueva Factura'
            break
        case '/nueva-proforma': headerTitle = 'Nueva Proforma'
            break
        case '/ver-facturas': headerTitle = 'Ver Facturas'
            break
        case '/ver-proformas': headerTitle = 'Ver Proformas'
            break
        case '/buscar-productos': headerTitle = 'Buscar Productos'
            break
        default: headerTitle = 'Panel'
            break
    }

    return (
		<header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
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

				<h1 className="uppercase">{headerTitle}</h1>
			</div>

			<div className="flex items-center">
				<button className="flex mx-4 text-gray-600 focus:outline-none" type="button">
					<svg
						className="h-6 w-6"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</button>

				<button className="flex text-gray-600 focus:outline-none" type="button">
					<svg
						className="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
				</button>
			</div>
		</header>
	)
}