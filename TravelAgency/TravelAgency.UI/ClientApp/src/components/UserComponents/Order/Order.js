import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { Link } from 'react-router-dom';

export class Order extends Component {
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
        this.handleSendMessage = this.handleSendMessage.bind(this);
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
        let form = new FormData();
        form.append('cost', this.state.order.totalCost);
        form.append('hotelSize', this.state.order.hotelSize);
        form.append('hotelId', this.state.order.hotelId);

        let url = "api/v1/orders";
        let method = 'POST';

        let response = await fetch(url, {
            method: method,
            mode: 'cors',
            body: form
        })

        if (response.ok) {
            alert("Вы успешно забронировали тур. На почту Вам придет уведомление. Для оформления заказа с вами свяжется специалист");
            this.props.history.push('/hotelsU');
        } else {
            alert(`Нет свободных мест`);
            //this.props.history.push('/login');
        }
    }

    async handleSendMessage() {
        if (this.state.messageIsValid == true) {
            let form = new FormData();
            form.append('message', this.state.message);
            form.append('tourId', this.state.order.tourId);

            let url = "api/v1/comments";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("Спасибо за ваш комментарий! Он отправлен на модерацию!");
            } else {
                this.props.history.push('/login');
            }
        }

    }

    async loadData() {
        let url = "api/v1/ordersInfo/" + this.props.match.params.id;
        let urlComments = "api/v1/comments/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => {
                this.setState({ order: results })
            });
        }

        let responseComment = await fetch(urlComments);

        if (responseComment.ok) {
            let responseJson = responseComment.json();

            responseJson.then(results => {
                this.setState({ comments: results.result });
            })
        }
    }

    async componentDidMount() {
        await this.loadData();
    }


    render() {
        let date = new Date(this.state.order.dateStart);
        var IsFull;
        if(this.state.order.hotelSize>0)
            IsFull="есть";
        else
            IsFull="нет";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <Link className="breadcrumb-item" to={`/`}>Главная</Link>
                                <Link className="breadcrumb-item" to={`/hotelsU`}>Отели</Link>
                                <li className="breadcrumb-item active" aria-current="page">Забронировать</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-info">
                            <span style={{ fontSize: "30px" }}><b>ЦЕНА:</b> {this.state.order.totalCost}$</span>

                        </div>
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
                                        <p><b>ОПИСАНИЕ: </b>{this.state.order.description}</p>
                                        <p><b>СВОБОДНЫЕ МЕСТА: </b>{IsFull}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-success">
                            {
                                this.state.order.hotelSize > 0 
                                ?<input type="button" className="btn btn-success" value="Забронировать" onClick={this.modalOrder} />
                                :<input type="button" disabled className="btn btn-success" value="Забронировать" onClick={this.modalOrder} />
                            }
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h1 className="display-4">КОММЕНТАРИИ</h1>
                            <hr style={{ borderBottom: "1px solid black" }} />
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <input type="button" className="btn btn-primary" value="Добавить комментарий" onClick={this.modalMessage} />
                            </div>
                            <div className="card-body">
                                {
                                    this.state.comments.map(function (item) {
                                        let date = new Date(item.dateMessage);

                                        return (
                                            <div key={item.commentId} className="card mb-2">
                                                <div className="card-body">
                                                    <h4>{item.email}:</h4>
                                                    <p>{item.message}</p>
                                                    <small style={{ color: "gray" }}>{date.toLocaleDateString()}</small>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalOrder} >
                    <ModalHeader toggle={this.modalOrder} >
                        Бронирование
                        </ModalHeader>
                    <ModalBody>
                        <p>Подтвердите нажатием на "Забронировать"?</p>
                        <button className="btn btn-outline-primary" onClick={this.handleSubmit}>Забронировать</button>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalMessage} >
                    <ModalHeader toggle={this.modalMessage} >
                        Добавление комментария
                        </ModalHeader>
                    <ModalBody>
                        <input type="text" placeholder="Сообщение" onChange={this.onChangeMessage} className="form-control" value={this.state.message} />
                        <small>Комментарий должен содержать не менее 3 символов</small>
                        <br />
                        <br />
                        <button className="btn btn-outline-primary" onClick={this.handleSendMessage}>Отправить</button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
