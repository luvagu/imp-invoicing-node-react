import { useHistory } from 'react-router-dom'

export default function DocumentSearchResults({ results, routeFolder }) {
    const history = useHistory()
    const handleOnClick = (param) => {
        history.push(`/ver-documento/${routeFolder}/${param}`)
    }

    return (
        <div className="mt-6 inline-block w-full overflow-hidden">
            <table className="w-full leading-normal">
                <thead>
                    <tr className="border-b border-gray-300 text-sm text-gray-800 font-bold uppercase">
                        <th className="p-4 text-left tracking-wider">No.</th>
                        <th className="p-4 text-left tracking-wider hidden md:table-cell">Fecha</th>
                        <th className="p-4 text-left tracking-wider">Cliente</th>
                        <th className="p-4 text-left tracking-wider hidden md:table-cell">Total</th>
                        <th className="p-4 text-left tracking-wider hidden lg:table-cell">Vend.</th>
                    </tr>
                </thead>
                <tbody>
                
                {results.map((res, idx) => (
                    <tr 
                        key={idx} 
                        className="bg-white border-b border-gray-300 text-sm text-gray-800 hover:bg-yellow-100 cursor-pointer"
                        onClick={() => handleOnClick(res.docNum)}
                        title="Ver documento"
                    >
                        <td className="p-4">{res.docNum}</td>
                        <td className="p-4 hidden md:table-cell">{res.shortDate}</td>
                        <td className="p-4">{res.clientName}</td>
                        <td className="p-4 hidden whitespace-nowrap md:table-cell">$ {res.docTotal}</td>
                        <td className="p-4 hidden whitespace-nowrap lg:table-cell">{res.user}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}
