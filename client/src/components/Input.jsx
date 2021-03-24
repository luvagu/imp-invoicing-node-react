export default function Input({ type = 'text', name, value, placeholder, onChange, onKeyDown }) {
    return (
        <input
            className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
            type={type}
            name={name}
            value={value || ''}
            placeholder={placeholder}
            onChange={onChange ? onChange : undefined}
            onKeyDown={onKeyDown ? onKeyDown : undefined}
        />
    )
}