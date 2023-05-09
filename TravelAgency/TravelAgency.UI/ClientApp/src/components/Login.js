import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "", emailIsValid: false,
            password: "", passwordIsValid: false,
            rememberMe: false,
            modalError: false,
            modalSignIn: false,
            errors: []
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onRememberMe = this.onRememberMe.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.modalError = this.modalError.bind(this);
        this.modalSignIn = this.modalSignIn.bind(this);
    }

    modalError() {
        this.setState({
            modalError: !this.state.modalError
        });
    }

    modalSignIn() {
        this.setState({
            modalSignIn: !this.state.modalSignIn
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
        return password.length > 0;
    }

    onChangePassword(e) {
        let val = e.target.value;
        let valid = this.validatePassword(val);

        this.setState({ password: val, passwordIsValid: valid });
    }

    onRememberMe(e) {
        this.setState({ rememberMe: false });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.emailIsValid === true && this.state.passwordIsValid === true) {
            let form = new FormData();
            form.append('email', this.state.email);
            form.append('password', this.state.password);
            form.append('rememberMe', this.state.rememberMe);
            form.append('returnUrl', "");

            let url = "api/v1/users/login";
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
                        this.setState({ modalSignIn: !this.state.modalSignIn });
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

        return (
            <div className="card shadow bg-white rounded">
                <div className="card-header text-center">
                    <h2>Уже зарегистрированы?</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="Email"><b>EMAIL</b></label>
                            <input type="text" id="Email" placeholder="Email" onChange={this.onChangeEmail} className="form-control" style={{ borderColor: emailColor, borderWidth: 3 }} />
                        </div>
                        <div className="form-group">
                            <label for="Password"><b>ПАРОЛЬ</b></label>
                            <input type="password" id="Password" placeholder="Пароль" onChange={this.onChangePassword} className="form-control" style={{ borderColor: passwordColor, borderWidth: 3 }} />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="Remember" />
                            <label className="ml-1" for="Remember"><b>Запомнить меня?</b></label>
                        </div>
                        <input type="submit" value="ВОЙТИ" className="btn btn-outline-dark" />
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
                        <p style={{ fontSize: "20px" }}>Благодаря Вам мы становимся лучше! Спасибо что выбрали именно нас!</p>
                    </div>
                </div>

                <div>
                    <Modal isOpen={this.state.modalError} >
                        <ModalHeader toggle={this.modalError} >
                            Неправильный логин или пароль
                        </ModalHeader>
                        <ModalBody>
                            <p><b>пример Email:</b> qwerty@gmail.com</p>
                            <p><b>Пароль:</b>Длина не менее 6 символов.</p>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modalSignIn} >
                        <ModalHeader toggle={this.modalSignIn} >
                            Ошибка при входе
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
                </div>
            </div>
        );
    }
}
