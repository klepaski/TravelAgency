import React, { Component } from 'react';
//import { Card, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.dateStart)

        return (
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.name}</h2>
                </div>
                <div className="card-body">
                <div className="row"> 
                    <div className="col-md-10">                   
                        <dl className="row">
                                <dt className="col-sm-4">
                                    <img style={{ width: '100%', display: 'block', marginRight: 'auto', marginLeft: 'auto' }} style={{ maxWidth: '100%' }} src={atob(this.props.imagePath)} />
                                </dt>

                                <dt className="col-sm-4">
                                    Цена: <br />
                                    Дата отправления: <br />
                                    Длительность: <br />
                                    Место отправления: <br />
                                    Место прибытия: <br />
                                    Транспорт: <br />
                                    Описание тура: <br />
                                </dt>

                                <dd className="col-sm-4">
                                    {this.props.cost}$ <br />
                                    {date.toLocaleDateString()}<br />
                                    {this.props.duration} дней<br />
                                    {this.props.countryFrom}<br />
                                    {this.props.countryTo}<br />
                                    {this.props.transport}<br />
                                    {this.props.aboutTour}<br />
                                </dd>

                        </dl>
                    </div>
                    <div className="col-md-2 text-center">
                         <Link className="btn btn-outline-warning" to={`/hotelsTour/${this.props.id}`}>Выбрать отель</Link>
                    </div>
                 </div>                               
                </div>
            </div>
        );
    }
}

export class TableU extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                            key={item.tourId}
                            id={item.tourId}
                            name={item.tourName}
                            duration={item.duration}
                            dateStart={item.dateStart}
                            cost={item.cost}
                            sale={item.sale}
                            countryFrom={item.countryFrom}
                            countryTo={item.countryTo}
                            transport={item.transport}
                            aboutTour={item.aboutTour}
                            imagePath={item.imagePath}
                        />
                    })
                }
            </div>
        );
    }
}
