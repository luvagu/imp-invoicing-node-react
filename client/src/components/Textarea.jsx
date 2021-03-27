export default function Textarea({ value, placeholder, onChange  }) {
    return (
        <textarea 
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500" 
            rows="2"
            value={value || ''}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}
