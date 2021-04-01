import { SvgSpinner } from '../icons'

export default function Spinner() {
    return (
        <div className="p-1 text-white rounded-full bg-yellow-500 inline-flex items-center justify-center" title="Cargando...">
            <SvgSpinner className="animate-spin h-5 w-5" />
        </div>
    )
}
