import { SvgDocText, SvgGrid, SvgUsers } from '../icons'

export default function Home() {
	return (
		<div className="container mx-auto px-4 md:px-6 py-4 md:py-6">

			<h3 className="text-black text-3xl font-medium">Resumen</h3>

			<div className="mt-6">

				<div className="flex flex-wrap -mx-6">

					<div className="w-full px-6 sm:w-1/2 mb-6 md:mt-0">
						<div className="flex items-center px-5 py-6 shadow rounded-lg bg-gray-300">
							<div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
								<SvgDocText className="h-8 w-8 text-white" />
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-800">
									40,154
								</h4>
								<div className="text-gray-600">Facturas</div>
							</div>
						</div>
					</div>

					<div className="w-full px-6 sm:w-1/2 mb-6 md:mt-0">
						<div className="flex items-center px-5 py-6 shadow rounded-lg bg-gray-300">
							<div className="p-3 rounded-full bg-yellow-600 bg-opacity-75">
								<SvgDocText className="h-8 w-8 text-white" />
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-800">
									325
								</h4>
								<div className="text-gray-600">Proformas</div>
							</div>
						</div>
					</div>

					<div className="w-full px-6 sm:w-1/2 mb-6 md:mt-0">
						<div className="flex items-center px-5 py-6 shadow rounded-lg bg-gray-300">
							<div className="p-3 rounded-full bg-green-600 bg-opacity-75">
								<SvgUsers className="h-8 w-8 text-white" />
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-800">
									20,653
								</h4>
								<div className="text-gray-600">Clientes</div>
							</div>
						</div>
					</div>
				
					<div className="w-full px-6 sm:w-1/2 mb-6 md:mt-0">
						<div className="flex items-center px-5 py-6 shadow rounded-lg bg-gray-300">
							<div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
								<SvgGrid className="h-8 w-8 text-white" />
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-800">
								6,546
								</h4>
								<div className="text-gray-600">Productos</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
	)
}
