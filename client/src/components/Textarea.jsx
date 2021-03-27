export default function Textarea({ value, placeholder, onChange  }) {
    return (
        <textarea 
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-sm text-gray-700 uppercase focus:outline-none focus:bg-white focus:border-blue-500" 
            rows="3"
            value={value || ''}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}
