import { useState } from 'react'
import Input from '../components/Input'
import Spinner from '../components/Spinner'

export default function Settings() {
    const [sequence, setSequence] = useState(0)

    const handleChange = (e) => {
        const match = e.target.value.match(/[0-9]/g)
        const numbers = match ? match.join('') : ''
        setSequence(numbers)
        return e.target.value = numbers
    }

    const handleClick = () => {
        console.log(sequence)
    }

    return (
        <div className="container mx-auto px-6 py-6">
            <h3 className="text-black text-3xl font-medium">Ajustes</h3>

            <div className="flex flex-wrap mt-6">
                <label className="text-gray-800 block mb-2 font-bold text-sm uppercase">Actualizar secuencia de facturas</label>
                <Input type='text' name='facturas' placeholder='Secuencia de facturas' onChange={handleChange}  />
            </div>

            <div className="flex items-center mt-2">
				<button
					type="button"
					className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
                    onClick={handleClick}
                >
					Actualizar
				</button>
                {false && <div className="ml-4"><Spinner /></div>}
			</div>
        </div>
    )
}
