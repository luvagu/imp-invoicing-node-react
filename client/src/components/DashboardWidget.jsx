import { SvgDollar, SvgGrid, SvgDocText, SvgUsers } from "../icons"

export default function DashboardWidget({ icon = 'docText', bgcolor = 'indigo', name, value }) {
    const icons = {
        docText : <SvgDocText className="h-8 w-8 text-white" />,
        users : <SvgUsers className="h-8 w-8 text-white" />,
        grid : <SvgGrid className="h-8 w-8 text-white" />,
        dollar : <SvgDollar className="h-8 w-8 text-white" />,
    }

    return (
        <div className="w-full sm:w-1/2 px-6 mb-6 md:mt-0">
            <div className="flex items-center px-5 py-6 shadow rounded-lg bg-gray-300">
                <div className={`p-3 rounded-full bg-${bgcolor}-600 bg-opacity-75`}>
                    {icons[icon]}
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-800">
                        {value || '0'}
                    </h4>
                    <div className="text-gray-600">{name}</div>
                </div>
            </div>
        </div>
    )
}
