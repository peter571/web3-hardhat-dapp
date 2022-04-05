import { InputProp } from '../types'

const Input = (prop: InputProp) => {
    return (
        <input
            className="outline-none rounded-sm placeholder:italic placeholder:text-slate-400 block bg-white py-1 pl-4 pr-3 shadow-sm"
            type={prop.type}
            name={prop.name}
            value={prop.value}
            placeholder={prop.placeholder}
            onChange={prop.onChange}
        //min={0}
        />
    )
}

export default Input