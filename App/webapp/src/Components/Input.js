import React from 'react'
import '../Css/Input.css'

export const Input = ({size = "regular", placeholder, value = "", classList = "", type = "input", id = "", name = "", rows, cols}) => {
    size = "input-" + size
    let html = ""
    if (type === "input") {
        html = <input className={size + ' ' + classList} placeholder={placeholder} value={value} name={name} id={id}/>
    } else if (type === "textarea") {
        html =
            <textarea className={"textarea-regular" + ' ' + classList} placeholder={placeholder} value={value}
                      name={name} id={id} rows={rows} cols={cols}/>
    } else if (type === "number") {
        html = <input className={size + ' ' + classList} placeholder={placeholder} value={value} name={name} id={id}
                      type="number"/>
    }
    return html
}

export default Input