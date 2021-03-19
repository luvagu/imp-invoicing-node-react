import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import DynamicForm from './components/DynamicForm'
import ProductSearchPage from './components/ProductSearchPage'

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className="flex h-screen bg-gray-200">
			<Router>
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<div className="flex-1 flex flex-col overflow-hidden">
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route path="/nueva-factura" component={DynamicForm} />
							<Route path="/nueva-proforma" />
							<Route path="/ver-facturas" />
							<Route path="/ver-proformas" />
							<Route path="/buscar-productos" component={ProductSearchPage} />
						</Switch>
					</main>
				</div>
			</Router>	
		</div>
	)
}

export default App
