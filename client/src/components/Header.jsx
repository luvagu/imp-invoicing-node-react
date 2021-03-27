import { Link, useLocation } from 'react-router-dom'

import { SvgGear, SvgLogIn, SvgLogOut, SvgMenu } from '../icons'

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation()
	
    let headerTitle

    switch (location.pathname) {
		case '/ajustes': headerTitle = 'Ajustes'
            break
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
					<SvgMenu />
				</button>

				<h3 className="uppercase text-sm sm:text-lg text-black font-bold">{headerTitle}</h3>
			</div>

			{/* Login & Logout buttons */}
			<div className="flex items-center">
				<Link to='/ajustes' className="flex mx-4 text-gray-600 focus:outline-none" title="Ajustes">
					<SvgGear />
				</Link>

				<button className="flex mr-4 text-gray-600 focus:outline-none" title="Salir">
					<SvgLogOut />
				</button>

				<button className="flex text-gray-600 focus:outline-none" title="Ingresar">
					<SvgLogIn />
				</button>
			</div>
		</header>
	)
}
