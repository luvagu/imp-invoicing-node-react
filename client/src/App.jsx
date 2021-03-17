import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Sidebar from './components/Sidebar'

function App() {
	return (
		<div className="flex h-screen bg-gray-200">
			<Router>
				<Sidebar />
				<Switch>
					{/* <Route path="/nueva-factura" component={Invoices} />
					<Route path="/nueva-proforma" component={Quotes} />
					<Route path="/nueva-proforma" component={Quotes} />
					<Route path="/ver-facturas" component={Quotes} />
					<Route path="/ver-proformas" component={Quotes} />
					<Route path="/ver-products" component={Quotes} />
					<Route exact path="/" component={Home} /> */}
				</Switch>
			</Router>	
		</div>
		
	)
}

export default App
