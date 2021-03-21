export default function Modal({ show, children }) {
    return (
        <div className={`fixed z-40 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 transition-opacity ${show ? 'h-full w-full opacity-100 visible' : 'h-0 w-0 opacity-0 invisible'}`}>
            {children}
        </div>
    )
}
