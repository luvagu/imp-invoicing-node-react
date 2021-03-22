export default function SaveDocIcon({ handle }) {
    return (
        <button 
            className="p-1 text-white rounded-full bg-indigo-600 hover:bg-indigo-800 inline-flex items-center justify-center" 
            title="Guardar"
            type="button"
            onClick={handle}
        >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
        </button>
    )
}
