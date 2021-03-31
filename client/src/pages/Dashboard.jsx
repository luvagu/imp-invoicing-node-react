import { useEffect, useState } from 'react'
import { dataGetApi } from '../api/helpers'

import DashboardWidget from '../components/DashboardWidget'
import Spinner from '../components/Spinner'

export default function Dashboard({ user = 'Supervisor' }) {
	const [stats, setStats] = useState(null)
	const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		let isDone = false
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const sequences = await dataGetApi('/doc-stats')
                if (!isDone) setStats(sequences)
            } catch (error) {
                if (!isDone) {
                    console.log(error.response?.data.error)
                    setErrorMsg(error.response?.data.error || 'Network Error')
                }
            }
            setIsLoading(false)
        }
        fetchData()
        
        return () => isDone = true
	}, [])

	useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorMsg('')
        }, 5000)

        return () => clearTimeout(timeout)
    }, [errorMsg])

	return (
		<div className="container lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">

			<h3 className="text-black text-3xl font-medium">Hola, {user} {isLoading && <Spinner />}</h3>

			{errorMsg && <div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}

			<div className="flex flex-wrap mt-6 -mx-6">
				<DashboardWidget icon='dollar' bgcolor='green' value={`$ ${stats?.ventas}`} name='Ventas' />
				<DashboardWidget bgcolor='red' value={stats?.egresos} name='Egresos' />
				<DashboardWidget value={stats?.facturas} name='Facturas' />
				<DashboardWidget bgcolor='yellow' value={stats?.proformas} name='Proformas' />
				<DashboardWidget icon='users' bgcolor='purple' value={stats?.clients} name='Clientes' />
				<DashboardWidget icon='grid' bgcolor='pink' value={stats?.products} name='Productos' />
			</div>
			
		</div>
	)
}
