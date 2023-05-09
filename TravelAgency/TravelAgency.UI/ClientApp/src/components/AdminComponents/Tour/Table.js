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
                    <Link className="btn btn-warning" to={`/updateTour/${this.props.id}`}>ИЗМЕНИТЬ</Link>
                </td>
                <td>
                    <Link className="btn btn-danger" to={`/deleteTour/${this.props.id}`}>УДАЛИТЬ</Link>
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
                <Link className="btn btn-success btn-block mb-3" to="/createTour">СОЗДАТЬ</Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ТУР</th>
                            <th>ИЗМЕНИТЬ</th>
                            <th>УДАЛИТЬ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(function (item) {
                                return <Item key={item.tourId} id={item.tourId} name={item.tourName} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>ТУР</th>
                            <th>ИЗМЕНИТЬ</th>
                            <th>УДАЛИТЬ</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
