import { SvgSearch } from '../icons'
import Input from './Input'

export default function SearchInput({ name, placeholder, extraClass = '', handle }) {
    return (
        <div className={`relative ${extraClass}`}>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <SvgSearch className="h-5 w-5"/>
            </span>

            <Input
                extraClass="pl-10 pr-4"
                type="search"
                name={name}
                placeholder={placeholder}
                onKeyDown={handle}
            />
        </div>
    )
}
