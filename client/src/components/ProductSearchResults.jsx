export default function ProductSearchResults({ results }) {
    return (
        <div className="mt-6 inline-block w-full overflow-hidden">
            <table className="w-full leading-normal">
                <thead>
                    <tr className="border-b border-gray-300 text-sm text-gray-800 font-bold uppercase">
                        <th className="p-4 text-left tracking-wider">Codigo</th>
                        <th className="p-4 text-left tracking-wider">Nombre</th>
                        <th className="p-4 text-left tracking-wider">Precio</th>
                        <th className="p-4 text-left tracking-wider hidden lg:table-cell">Stock</th>
                        <th className="p-4 text-left tracking-wider hidden lg:table-cell">Costo</th>
                        <th className="p-4 text-left tracking-wider hidden lg:table-cell whitespace-nowrap">Ult. Costo</th>
                    </tr>
                </thead>
                <tbody>
                
                {results.map((res, idx) => (
                    <tr key={idx} className="bg-white border-b border-gray-300 text-sm text-gray-800 hover:bg-gray-50">
                        <td className="p-4">{res.id}</td>
                        <td className="p-4">{res.name}</td>
                        <td className="p-4 whitespace-nowrap">$ {res.price}</td>
                        <td className="p-4 hidden lg:table-cell">{res.stock}</td>
                        <td className="p-4 hidden lg:table-cell">{res.cost}</td>
                        <td className="p-4 hidden lg:table-cell">{res.lastCost}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}
