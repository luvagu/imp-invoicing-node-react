export default function SearchModalResults({ labelId, labelName, results, handleSelectedItem }) {
	return (
		<>
			<div className="flex items-center m-0 border-b py-1">
				<div className="w-32">
					<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
						{labelId}
					</p>
				</div>

				<div className="w-auto">
					<p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        {labelName}
					</p>
				</div>
			</div>

			<div className="overflow-y-auto max-h-48">

            {results.map((res, idx) => (
                <div key={idx} className="flex items-center m-0 border-b h-8 hover:bg-gray-100">
                    <div className="w-32">
                        <p className="text-gray-800 uppercase tracking-wide text-sm truncate">
                            {res.id}
                        </p>
                    </div>

                    <div className="w-3/5 mr-2">
                        <p className="text-gray-800 uppercase tracking-wide text-sm truncate">
                            {res.name}
                        </p>
                    </div>

                    <div className="w-auto text-right">
                        <button
                            type="button"
                            className="mt-1 text-green-500 hover:text-green-600 text-sm"
                            onClick={() => handleSelectedItem(idx)}
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>  
            ))}
				
			</div>
		</>
	)
}
