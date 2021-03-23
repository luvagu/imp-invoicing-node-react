import { Link, useLocation } from 'react-router-dom'

export default function DocActionsBtn({ action, handle, title, color = 'indigo' }) {
    const self = useLocation().pathname
    return action === 'link' 
        ? <NewDocLink to={self} title={title} /> 
        : <ActionButton action={action} handle={handle} title={title} color={color} />
}

function ActionButton({ action, handle, title, color }) {
    return (
        <button 
            className={`ml-2 p-1 text-white rounded-full bg-${color}-600 hover:bg-${color}-800 inline-flex items-center justify-center`}
            title={title}
            type="button"
            onClick={handle}
        >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {action === 'edit' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}

                {action === 'save' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />}

                {action === 'update' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />}
            </svg>
        </button>
    )
}

function NewDocLink({ to, title }) {
    return (
        <Link to={to} className="ml-2 p-1 text-white rounded-full bg-gray-500 hover:bg-gray-700 inline-flex items-center justify-center" title={title}>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </Link>
    )
}
