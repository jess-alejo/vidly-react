import React from "react"

const Select = ({ name, label, options, error, ...rest }) => {
  let classes = `form-control ${error && "is-invalid"}`

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className={classes}>
        <option key={""}></option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default Select
