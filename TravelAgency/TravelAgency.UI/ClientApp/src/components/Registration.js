import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "", emailIsValid: false,
            password: "", passwordIsValid: false,
            confirmPassword: "", confirmPasswordIsValid: false,
            errors: [],
            modalRegister: false,
            modalError: false
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfimPassword = this.onChangeConfimPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.modalRegister = this.modalRegister.bind(this);
        this.modalError = this.modalError.bind(this);
    }

    modalError() {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    modalRegister() {
        this.setState({
            modalRegister: !this.state.modalRegister
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    onChangeEmail(e) {
        let val = e.target.value;
        let valid = this.validateEmail(val);
        this.setState({ email: val, emailIsValid: valid });
    }

    validatePassword(password) {
        return password.length > 6;
    }

    onChangePassword(e) {
        let val = e.target.value;
        let valid = this.validatePassword(val);
        this.setState({
            password: val,
            passwordIsValid: valid,
            confirmPassword: "",
            confirmPasswordIsValid: false
        });
    }

    validateConfimPassword(confirmPassword) {
        return confirmPassword === this.state.password;
    }

    onChangeConfimPassword(e) {
        let val = e.target.value;
        let valid = this.validateConfimPassword(val);
        this.setState({ confirmPassword: val, confirmPasswordIsValid: valid });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.emailIsValid === true && this.state.passwordIsValid === true && this.state.confirmPasswordIsValid === true) {
            let form = new FormData();
            form.append('email', this.state.email);
            form.append('password', this.state.password);
            form.append('passwordConfirm', this.state.confirmPassword);

            let url = "api/v1/users/register";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            });

            let responseJson = "";

            if (response.ok) {
                window.location.replace("/");
            } else {
                responseJson = response.json();
                responseJson.then(results => {
                    this.setState({ errors: results.errors });

                    if (this.state.errors.length > 0) {
                        this.setState({ modalRegister: !this.state.modalRegister });
                    }
                });

            }
        }
        else {
            this.setState({
                modalError: !this.state.modalError
            });
        }
    }

    renderForm() {
        let emailColor = this.state.emailIsValid === true ? "green" : "lightGray"
        let passwordColor = this.state.passwordIsValid === true ? "green" : "lightGray";
        let confirmPasswordColor = this.state.confirmPasswordIsValid === true ? "green" : "lightGray";

        return (
            <div className="card shadow bg-white rounded">
                <div className="card-header text-center">
                    <meta charset="utf-8"/>
                    <h2>Зарегистрироваться</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="Email"><b>EMAIL</b></label>
                            <input type="text" id="Email" placeholder="EMAIL" onChange={this.onChangeEmail} className="form-control" style={{ borderColor: emailColor, borderWidth: 3 }} />
                        </div>
                        <div className="form-group">
                            <label for="Password"><b>ПАРОЛЬ</b></label>
                            <input type="password" id="Password" placeholder="PASSWORD" onChange={this.onChangePassword} className="form-control" style={{ borderColor: passwordColor, borderWidth: 3 }} />
                        </div>
                        <div className="form-group">
                            <label for="ConfirmPassword"><b>ПОДТВЕРДИТЕ ПАРОЛЬ</b></label>
                            <input type="password" id="ConfirmPassword" placeholder="CONFIRM PASSWORD" onChange={this.onChangeConfimPassword} className="form-control" style={{ borderColor: confirmPasswordColor, borderWidth: 3 }} />
                        </div>
                        <input type="submit" value="Продолжить" className="btn btn-outline-dark" />
                    </form>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {this.renderForm()}
                    </div>
                    <div className="col-md-6 text-center">
                        <h1 className="display-4">Тур агентство YU-TRAVEL♥</h1>
                        <p style={{ fontSize: "20px" }}>Зашли к нам впервые? Пройдите моментальную регистрацию</p>
                    </div>                  
                </div>

                <div>
                    <Modal isOpen={this.state.modalRegister} >
                        <ModalHeader toggle={this.modalRegister} >
                            Неправильно введен пароль или логин
                        </ModalHeader>
                        <ModalBody>
                            <ul>
                                {
                                    this.state.errors.map(e => {
                                        return <li key={e.length}>{e}</li>
                                    })
                                }
                            </ul>

                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modalError} >
                        <ModalHeader toggle={this.modalError} >
                            Sign In Error
                        </ModalHeader>
                        <ModalBody>
                            <p><b>Пример Email:</b> qwerty@gmail.com</p>
                            <p><b>Пароль:</b>Длина пароля должна быть не менее 6 символов</p>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}
