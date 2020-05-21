import React from 'react'

class SignUp extends React.Component {


    handleClick(event) {

    }

    render() {
        return (
            <div class="login">
                <div>
                    <h1>Únete y empieza a jugar!</h1>
                </div>
                <div>
                    <form>
                        <input type="text" name="name" placeholder="Usuario" />
                        <input type="password" name="password" placeholder="********" />

                        <input type="submit" class="btn-regular" value="Registrarme" onClick={(event) => this.handleClick(event)}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp