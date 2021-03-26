import Input from './Input'
import Spinner from './Spinner'

export default function SearchModalBody({
	searchLabel,
	inputIdName,
	inputIdPaceholder,
	inputQueryName,
	inputQueryPaceholder,
	inputsHandle,
	closeModal,
	isLoading,
	errorMsg,
	children,
}) {
	return (
		<div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
			<h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">
				Buscar {searchLabel} por:
			</h2>

			<div className="flex mb-6">
				<div className="w-52 mr-2">
					<Input
						extraClass="mb-1 py-2 px-4"
						type="search"
						name={inputIdName}
						placeholder={inputIdPaceholder}
						onKeyDown={inputsHandle}
					/>
				</div>

				<div className="w-full">
					<Input
						extraClass="mb-1 py-2 px-4"
						type="search"
						name={inputQueryName}
						placeholder={inputQueryPaceholder}
						onKeyDown={inputsHandle}
					/>
				</div>
			</div>

			{isLoading && (
				<div className="m-0 text-center">
					<Spinner />
				</div>
			)}

			{errorMsg && (
				<div className="m-0 px-4 text-center text-sm text-red-600 font-semibold uppercase">
					{errorMsg}
				</div>
			)}

			{children}

			<div className="mt-6 text-right">
				<button
					type="button"
					className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm"
					onClick={closeModal}
				>
					Cancelar
				</button>
			</div>
		</div>
	)
}
