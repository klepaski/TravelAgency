import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td><b>{this.props.name}</b></td>
                <td>
                    <Link className="btn btn-warning" to={`/updateHotel/${this.props.id}`}>ОБНОВИТЬ</Link>
                </td>
                <td>
                    <Link className="btn btn-danger" to={`/deleteHotel/${this.props.id}`}>УДАЛИТЬ</Link>
                </td>
            </tr>
        );
    }
}

export class Table extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="text-center">
                <Link className="btn btn-success btn-block mb-3" to="/createHotel">СОЗДАТЬ НОВЫЙ ОТЕЛЬ</Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ОТЕЛЬ</th>
                            <th>ОБНОВИТЬ</th>
                            <th>УДАЛИТЬ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(function (item) {
                                return <Item key={item.hotelId} id={item.hotelId} name={item.hotelName} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>ОТЕЛЬ</th>
                            <th>ОБНОВИТЬ</th>
                            <th>УДАЛИТЬ</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
