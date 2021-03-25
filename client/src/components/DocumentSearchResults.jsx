import { useHistory } from 'react-router-dom'

export default function DocumentSearchResults({ results, routeFolder }) {
    const history = useHistory()
    const handleOnClick = (param) => {
        history.push(`/${routeFolder}/${param}`)
    }

    return (
        <div className="mt-6 inline-block w-full overflow-hidden">
            <table className="w-full leading-normal">
                <thead>
                    <tr className="border-b border-gray-300 text-sm text-gray-800 font-bold uppercase">
                        <th className="p-4 text-left tracking-wider">No.</th>
                        <th className="p-4 text-left tracking-wider">Fecha</th>
                        <th className="p-4 text-left tracking-wider">Cliente</th>
                        <th className="p-4 text-left tracking-wider hidden lg:table-cell">Total</th>
                    </tr>
                </thead>
                <tbody>
                
                {results.map((res, idx) => (
                    <tr 
                        key={idx} 
                        className="bg-white border-b border-gray-300 text-sm text-gray-800 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleOnClick(res.docNum)}
                    >
                        <td className="p-4">{res.docNum}</td>
                        <td className="p-4">{res.docDate}</td>
                        <td className="p-4 whitespace-nowrap">{res.name || res.clientData?.name}</td>
                        <td className="p-4 hidden lg:table-cell">$ {res.docTotal}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}
