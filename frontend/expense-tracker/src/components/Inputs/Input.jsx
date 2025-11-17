import React from 'react'

const Input = ({value, onChange, placeholder, label, t}) => {
      const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <label className="">{label}</label>

            <div className="">
                <input
                    type={type== 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className=""
                    value={value}
                    onChange={(e) => onChange(e)}
                />
            </div>

        </div>
    )
}

export default Input