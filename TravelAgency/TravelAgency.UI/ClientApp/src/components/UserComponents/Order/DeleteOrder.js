import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { Link } from 'react-router-dom';

export class DeleteOrder extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: {},
            comments: [],
            message: "", messageIsValid: false
        }

        this.onChangeMessage = this.onChangeMessage.bind(this);

        this.modalOrder = this.modalOrder.bind(this);
        this.modalMessage = this.modalMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateMessage(message) {
        return message.length > 2;
    }

    onChangeMessage(e) {
        let val = e.target.value;
        let valid = this.validateMessage(val);
        this.setState({ message: val, messageIsValid: valid });
    }

    modalMessage() {
        this.setState({
            modalMessage: !this.state.modalMessage
        });
    }

    modalOrder() {
        this.setState({
            modalOrder: !this.state.modalOrder
        });
    }

    async handleSubmit() {
  debugger      
        let url = "api/v1/orders/"  + this.props.match.params.orderId;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        })

        if (response.ok) {
            alert("Вы успешно отменили бронь!");
            this.props.history.push('/hotelsU');
        } else {
            alert(`Не удалось отменить бронь. Попробуйте повторить операцию`);
            //this.props.history.push('/login');
        }
    }


    async loadData() {
debugger
        let url = "api/v1/ordersInfo/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => {
                this.setState({ order: results })
            });
        }
    }

    async componentDidMount() {
        await this.loadData();
    }


    render() {
        let date = new Date(this.state.order.dateStart);
        var IsFull;
        if(this.state.order.hotelSize > 0)
            IsFull="есть";
        else
            IsFull="нет";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link className="breadcrumb-item" to={`/`}>Главная</Link>
                                <Link className="breadcrumb-item" to={`/profile`}>Профиль</Link>
                                <li className="breadcrumb-item active" aria-current="page">Отмена Бронирования</li>
                            </ol>
                        </nav>
                        </div>
                        <div className="col-md-2" style={{marginTop: 6}}>
                        <input type="button" className="btn btn-danger" value="Отменить бронь" onClick={this.modalOrder} />
                    </div>
                </div>

               

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h2 className="display-4">{this.state.order.tourName}</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-10" style={{ fontSize: "22px" }}>
                                        <p><b>ДАТА ОТПРАВЛЕНИЯ:</b> {date.toLocaleDateString()}</p>                                       
                                        <p><b>СРОК:</b> {this.state.order.duration} дней</p>
                                        <p><b>ОТПРАВЛЕНИЕ:</b> {this.state.order.countryFrom}</p>
                                        <p><b>ПРИБЫТИЕ:</b> {this.state.order.countryTo}</p>
                                        <p><b>ТРАНСПОРТ:</b> {this.state.order.transport}</p>
                                        <p><b>ОПИСАНИЕ ТУРА:</b> {this.state.order.aboutTour}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h2 className="display-4">{this.state.order.hotelName}</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-10" style={{ fontSize: "22px" }}>
                                        <p><b>КОЛИЧЕСТВО ЗВЁЗД:</b> {this.state.order.class}<span className="text-warning">★</span></p>
                                        <p><b>ОПИСАНИЕ:</b>{this.state.order.description}</p>
                                        <p><b>СВОБОДНЫЕ МЕСТА: </b>{IsFull}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    


                <Modal isOpen={this.state.modalOrder} >
                    <ModalHeader toggle={this.modalOrder} >
                        Отмена бронирования
                        </ModalHeader>
                    <ModalBody>
                        <p>Подтвердите нажатием на "Отменить бронь"</p>
                        <button className="btn btn-outline-primary" onClick={this.handleSubmit}>Отменить бронь</button>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}
