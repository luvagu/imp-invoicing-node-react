export default function Input({ extraClass = '', type = 'text', name, placeholder, ...extraProps }) {
    return (
        <input
            className={`${extraClass} bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...extraProps}
        />
    )
}
