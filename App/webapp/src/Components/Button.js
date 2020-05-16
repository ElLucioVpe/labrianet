import React from 'react'

export const Button = ({value, size, url}) => {
    return (
        <a href={url}>{value}</a>
    )
}