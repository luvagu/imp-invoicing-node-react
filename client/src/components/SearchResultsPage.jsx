export default function SearchResultsPage({ results }) {
    return (
        <div className="mt-6 inline-block w-full rounded overflow-hidden">
            <table className="w-full leading-normal">
                <thead>
                    <tr className="bg-gray-200">
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Codigo
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                            Precio
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider hidden lg:table-cell">
                            Stock
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider hidden lg:table-cell">
                            Costo
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider hidden lg:table-cell">
                            Ult. Costo
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                {results.map((res, idx) => (
                    <tr key={idx} className="bg-white hover:bg-gray-50">
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{res.id}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{res.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">${res.price}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm hidden lg:table-cell">
                            <p className="text-gray-900 whitespace-no-wrap">{res.stock}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm hidden lg:table-cell">
                            <p className="text-gray-900 whitespace-no-wrap">{res.cost}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm hidden lg:table-cell">
                            <p className="text-gray-900 whitespace-no-wrap">{res.lastCost}</p>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}
