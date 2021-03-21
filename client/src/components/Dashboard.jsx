export default function Dashboard() {
	return (
		<div className="container mx-auto px-6 py-8">

			<h3 className="text-gray-700 text-3xl font-medium">Resumen</h3>

			<div className="mt-6">

				<div className="flex flex-wrap -mx-6">

					<div className="w-full px-6 sm:w-1/2 mb-6 md:mt-0">
						<div className="flex items-center px-5 py-6 shadow rounded-lg bg-gray-300">
							<div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
								<svg
									className="h-8 w-8 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
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
								<svg
									className="h-8 w-8 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
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
								<svg
									className="h-8 w-8 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
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
								<svg
									className="h-8 w-8 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
									/>
								</svg>
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
