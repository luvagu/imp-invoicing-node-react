import { SvgPlusCircleSm } from '../icons'

export default function SearchModalResults({ labelId, labelName, results, handleSelectedItem }) {
	return (
		<>
			<div className="flex items-center m-0 border-b pb-2">
				<div className="flex-none w-28">
					<p className="text-gray-800 uppercase text-sm font-bold">
						{labelId}
					</p>
				</div>

				<div className="w-3/4">
					<p className="text-gray-800 uppercase text-sm font-bold">
						{labelName}
					</p>
				</div>
			</div>

			<div className="overflow-y-auto max-h-48">
				{results.map((res, idx) => (
					<div
						key={idx}
						className="flex items-center m-0 border-b h-8 hover:bg-green-100 cursor-pointer"
						onClick={() => handleSelectedItem(idx)}
					>
						<div className="flex-none w-28">
							<p className="text-gray-800 uppercase text-sm truncate">
								{res.id}
							</p>
						</div>

						<div className="w-3/4">
							<p className="text-gray-800 uppercase text-sm truncate">
								{res.name}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
