import { SvgClose } from '../icons'

export default function Modal({ showModal, closeModal, children }) {
    return (
        <div className={`fixed z-40 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 transition-opacity ${showModal ? 'h-full w-full opacity-100 visible' : 'h-0 w-0 opacity-0 invisible'}`}>
            <div className="p-4 max-w-2xl mx-auto absolute left-0 right-0 overflow-hidden mt-24">
				<div 
                    className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                    onClick={closeModal}
                >
					<SvgClose className="w-5 h-5" />
				</div>
                {children}
            </div>
        </div>
    )
}
