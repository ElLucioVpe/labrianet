import React from "react";
import "../Css/Input.css";

export const Input = ({
                          size = "regular",
                          placeholder = "",
                          value = "",
                          classList = "",
                          type = "input",
                          id = "",
                          name = "",
                          rows,
                          cols,
                          onChange,
                          onClick
                      }) => {
    size = "input-" + size;
    let html = "";
    if (type === "input" || type === "password" || type === "text") {
        html = (
            <input
                className={size + " " + classList}
                placeholder={placeholder}
                defaultValue={value}
                name={name}
                id={id}
                type={type}
                onChange={onChange}
            />
        );
    } else if (type === "textarea") {
        html = (
            <textarea
                className={"textarea-regular" + " " + classList}
                placeholder={placeholder}
                defaultValue={value}
                name={name}
                onChange={onChange}
                onClick={onClick}
                id={id}
                rows={rows}
                cols={cols}
            />
        );
    } else if (type === "number") {
        html = (
            <input
                className={size + " " + classList}
                placeholder={placeholder}
                defaultValue={value}
                name={name}
                id={id}
                type="number"
            />
        );
    }
    return html;
};

export default Input;
