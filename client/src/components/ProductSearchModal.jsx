import React from 'react'

export default function ProductSearchModal({ show, handleClose, handleAddProduct }) {
	return (
		<div className={`${show ? '' : 'hidden'} fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full bg-black bg-opacity-80 transition-opacity`}>
			<div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
				<div 
                    className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                    onClick={handleClose}
                >
					<svg
						className="fill-current w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>

				<div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
					<h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">
						Buscar producto por:
					</h2>

					<div className="flex">
						<div className="mb-4 w-36 mr-2">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								name="code"
								placeholder="Codigo"
                                onKeyDown={handleAddProduct}
							/>
						</div>

						<div className="mb-4 w-36 mr-2">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								name="partial-code"
								placeholder="Codigo parcial"
                                onKeyDown={handleAddProduct}
							/>
						</div>

						<div className="mb-4 w-36">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								name="partial-name"
								placeholder="Nombre parcial"
                                onKeyDown={handleAddProduct}
							/>
						</div>
					</div>

					<div className="flex mb-4 border-b py-1">
						<div className="mb-4 w-28">
							<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
								Codigo
							</p>
						</div>

						<div className="mb-4 w-2/3 mr-2">
							<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
								Nombre
							</p>
						</div>

						<div className="mb-4 w-auto"></div>
					</div>

					<div className="overflow-y-auto h-48">
						<div className="flex mb-4 border-b py-1">
							<div className="mb-4 w-28">
								<p className="text-gray-800 uppercase tracking-wide text-sm font-bold truncate">
									1221616
								</p>
							</div>

							<div className="mb-4 w-2/3 mr-2">
								<p className="text-gray-800 uppercase tracking-wide text-sm font-bold truncate">
									sdfasdfas sadas sdfsadf sdfasdf sdfasdf
								</p>
							</div>

							<div className="mb-4 w-auto text-right">
								<button className="text-green-500 hover:text-green-600 text-sm">
									<svg
										className="w-5 h-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div className="mt-8 text-right">
						<button
							type="button"
							className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm"
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
