import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.name}</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-9">
                        <dl className="row">
                                <dt className="col-sm-4">
                                    <img style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto' }} style={{ maxWidth: '100%' }} src={atob(this.props.imagePath)} />
                                </dt>

                                <dt className="col-sm-3">
                                    Цена за сутки: <br />
                                    Количество звезд: <br />
                                    Описание: <br />
                                </dt>

                                <dd className="col-sm-5">
                                    {this.props.cost}$ <br />
                                    {this.props.class}<span className="text-warning">★</span><br />
                                    {this.props.description}<br />
                                </dd>
                        </dl>
                        </div>
                        <div className="col-lg-3 noPadding text-center">
                            <Link className="btn btn-outline-success" to={`/orders/${this.props.id}`}>Забронировать </Link>
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
        if (this.props.data.length == 0) {
            return (
                <div className="text-center">
                    <h1></h1>
                </div>
            );
        }

        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                            key={item.hotelId}
                            id={item.hotelId}
                            name={item.hotelName}
                            class={item.class}
                            cost={item.cost}
                            description={item.description}
                            imagePath={item.imagePath}
                        />
                    })
                }
            </div>
        );
    }
}
