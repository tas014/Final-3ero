
const Input = props => {

    const { name, type, value ,onChange, label, errors, disabled} = props;

    return (
        <div className="inputBox">
            <label htmlFor={name} >{label}</label>
            <input 
                onChange={onChange} 
                name={name} 
                type={type} 
                id={name} 
                value={value}
                disabled={disabled}
            />
            {errors && <div className="fieldError">{errors}</div>}
        </div>
    )
}

export default Input