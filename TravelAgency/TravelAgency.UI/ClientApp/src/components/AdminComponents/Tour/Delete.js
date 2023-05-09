import React, { Component } from 'react';

export class DeleteTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourId: 0,
            name: "",
            countryFrom: "",
            countryTo: "",
            aboutTour:"",
            transport: "",
            duration: 0,
            cost: 0,
            dateStart: new Date(),
            imagePath:[]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        let url = "api/v1/tours/" + this.props.match.params.id;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        if (response.ok) {
            alert('Тур успешно удален!!!');
            this.props.history.push('/toursA');
        }
    }

    async loadData() {
        let url = "api/v1/tours/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => this.setState({
                tourId: results.tourId,
                name: results.tourName,
                duration: results.duration,
                dateStart: results.dateStart,
                cost: results.cost,
                countryFrom: results.countryFrom,
                countryTo: results.countryTo,
                imagePath: results.imagePath
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
                    <h2>УДАЛИТЬ ТУР</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Вы уверены что хотите удалить данный тур?</h3>
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
                    <h2>ТУР</h2>
                </div>
                <div className="card-body text-center">
                    <h3>{this.state.name}</h3>
                    <p>{this.state.cost}$</p>
                    <p>{date.toLocaleDateString()}</p>
                    <p>{this.state.countryFrom}</p>
                    <p>{this.state.countryTo}</p>
                    <p>{this.state.aboutTour}</p>
                    <p>{this.state.transport}</p>
                    <p>{this.state.duration} дней</p>
                    <img style={{maxWidth: '100%'}} src={atob(this.state.imagePath)}/>
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
