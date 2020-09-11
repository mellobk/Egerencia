import React, { Component } from 'react'
import { Link } from "react-router-dom";



class Button extends Component {

    render() {

        const { name, componentClass, redirect } = this.props

        return (
            <div className={componentClass}>
<Link   to={redirect}>{name} </Link>
            </div>
            


        )


    }
}

export default Button