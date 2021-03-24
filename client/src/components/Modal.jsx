export default function Modal({ showModal, closeModal, children }) {
    return (
        <div className={`fixed z-40 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 transition-opacity ${showModal ? 'h-full w-full opacity-100 visible' : 'h-0 w-0 opacity-0 invisible'}`}>
            <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
				<div 
                    className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                    onClick={closeModal}
                >
					<svg
						className="fill-current w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>
                {children}
            </div>
        </div>
    )
}
