import Spinner from "./Spinner"

export default function SearchModalBody({ searchLabel, inputIdName, inputIdPaceholder, inputTermsName, inputTermsPaceholder, inputsHandle, handleClose, isLoading, errorMsg, children }) {
    return (
        <>
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
						Buscar {searchLabel} por:
					</h2>

					<div className="flex mb-6">
						<div className="w-52 mr-2">
                            <SearchInput name={inputIdName} placeholder={inputIdPaceholder} handle={inputsHandle} />
						</div>

						<div className="w-full">
                            <SearchInput name={inputTermsName} placeholder={inputTermsPaceholder} handle={inputsHandle} />
						</div>
					</div>

					{isLoading && <div className="m-0 text-center"><Spinner /></div>}

					{errorMsg && <div className="m-0 px-4 text-center text-red-600 font-semibold uppercase">{errorMsg}</div>}

					{children}

					<div className="mt-6 text-right">
						<button
							type="button"
							className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm"
                            onClick={handleClose}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</>
    )
}

function SearchInput({ name, placeholder, handle }) {
    return (
        <input
            className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
            name={name}
            placeholder={placeholder}
            onKeyDown={handle}
        />
    )
}
