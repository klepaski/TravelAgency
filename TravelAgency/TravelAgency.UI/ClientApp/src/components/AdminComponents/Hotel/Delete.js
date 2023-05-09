import React, { Component } from 'react';

export class DeleteHotel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourId: 0,
            name: "",
            clas: 0,
            description: "",
            cost: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        let url = "api/v1/hotels/" + this.props.match.params.id;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        if (response.ok) {
            alert('Success!!!');
            this.props.history.push('/hotelsA');
        }
    }

    async loadData() {
        let url = "api/v1/hotels/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => this.setState({
                hotelId: response.hotelId,
                name: results.hotelName,
                cost: results.cost,
                clas: results.class,
                description: results.description,
                tourId: results.tourId
            }))
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderForm() {
        return (
            <div className="card mb-3">
                <div className="card-header text-center">
                    <h2>УДАЛИТЬ ОТЕЛЬ</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Вы уверены что хотите удалить данный отель?</h3>
                        <input type="submit" className="btn btn-outline-danger" value="Удалить" />
                    </form>
                </div>
            </div>
        );
    }

    renderCard() {
        let date = new Date(this.state.dateStart)

        return (
            <div className="card">
                <div className="card-header text-center">
                    <h2>HOTEL</h2>
                </div>
                <div className="card-body text-center">
                    <h3>{this.state.name}</h3>
                    <p>{this.state.cost}$</p>
                    <p>{this.state.class}</p>
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.renderForm()
                        }
                    </div>
                    <div className="col-md-6">
                        {
                            this.renderCard()
                        }
                    </div>
                </div>
            </div>
        );
    }
}
