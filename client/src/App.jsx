import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ProvideAuth } from './hooks/useAuth'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

import ErrorBoundary from './components/ErrorBoundary'
import PrivateRoute from './components/PrivateRoute'

import Dashboard from './pages/Dashboard'
import ProformaInvoice from './pages/ProformaInvoice'
import DocumentSearch from './pages/DocumentSearch'
import ProductSearch from './pages/ProductSearch'
import DocumentView from './pages/DocumentView'
import Settings from './pages/Settings'
import LogIn from './pages/LogIn'

export default function App() {
	// Sidebar state close/open
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<ProvideAuth>
			<div className="flex h-screen">
				<Router>
					<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<div className="flex-1 flex flex-col overflow-hidden">
						<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
						<main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
							<Switch>
								<ErrorBoundary>
									<Route exact path='/' component={Dashboard} />
									<PrivateRoute path='/ajustes' component={Settings} />
									<PrivateRoute path='/nuevo-egreso' component={() => 
										<ProformaInvoice key={Date.now().toString()} docType='Egreso' apiFolder='egresos' />} />
									<PrivateRoute path='/nueva-factura' component={() => 
										<ProformaInvoice key={Date.now().toString()} docType='Factura' apiFolder='facturas' />} />
									<PrivateRoute path='/nueva-proforma' component={() => 
										<ProformaInvoice key={Date.now().toString()} docType='Proforma' apiFolder='proformas' allowNotes={true}  />} />
									<PrivateRoute path='/buscar-documentos' component={DocumentSearch} />
									<PrivateRoute path='/buscar-productos' component={ProductSearch} />
									<PrivateRoute path='/ver-documento/:folder/:doc' component={DocumentView} />
									<Route path='/entrar' component={LogIn} />
								</ErrorBoundary>
							</Switch>
						</main>
					</div>
				</Router>	
			</div>
		</ProvideAuth>
	)
}
