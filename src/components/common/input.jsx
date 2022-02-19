import React from "react"

const Input = ({ name, label, error, ...rest }) => {
  let classes = `form-control ${error && "is-invalid"}`

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className={classes} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default Input
