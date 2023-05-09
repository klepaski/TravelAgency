import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Profile extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {},
            listOrder: [],
            modalCancelOrder: false
        };

        this.modalCancelOrder = this.modalCancelOrder.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
    }

    
    modalCancelOrder() {
        this.setState({
            modalCancelOrder: !this.state.modalCancelOrder
        });
    }

    cancelOrder() {
        alert('1');
    }

    async loadData() {
        let url = "api/v1/orders";

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => this.setState({
                listOrder: results
            }));
        }
    }


    async componentDidMount() {
        await this.loadData();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center ">
                        <h2 className="display-4">МОИ ЗАКАЗЫ</h2>
                        <hr style={{ borderBottom: "1px solid black" }} />
                    </div>
                    <div className="col-md-12">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ЦЕНА</th>
                                    <th>ДАТА ЗАКАЗА</th>
                                    <th>ДАННЫЕ О БРОНИ</th>
                                    <th>ОТМЕНА БРОНИ</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.listOrder.map(function (item) {
                                        let date = new Date(item.dateOrder);
                                        return (                                            
                                            <tr key={item.orderId}>
                                                <td>{item.cost}</td>
                                                <td>{date.toLocaleDateString()}</td>
                                                <td>
                                                    <Link className="btn btn-warning" to={`/showOrders/${item.hotelId}`} >ПОСМОТРЕТЬ БРОНЬ</Link>
                                                </td>
                                                <td>                                                                                                         
                                                <Link className="btn btn-danger" to={`/deleteOrder/${item.orderId}/${item.hotelId}`} >ОТМЕНИТЬ БРОНЬ</Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                          
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

