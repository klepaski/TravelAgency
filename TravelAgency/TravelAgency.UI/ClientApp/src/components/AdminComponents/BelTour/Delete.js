import React, { Component } from 'react';

export class DeleteBelTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            belTourId: 0,
            belTourName: "",
            placeFrom: "",
            placeTo: "",
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

        let url = "api/v1/belTours/" + this.props.match.params.id;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        if (response.ok) {
            alert('Тур успешно удален!!!');
            this.props.history.push('/toursAB');
        }
    }

    async loadData() {
        debugger
        let url = "api/v1/belTours/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(results => this.setState({
                belTourId: results.belTourId,
                belTourName: results.belTourName,
                duration: results.duration,
                dateStart: results.dateStart,
                cost: results.cost,
                placeFrom: results.placeFrom,
                placeTo: results.placeTo,
                transport: results.transport,
                aboutTour: results.aboutTour,
                imagePath: results.imagePath
            }))
        }
debugger                
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
                    <h4>Название тура: {this.state.belTourName}</h4>
                    <h4>Цена: {this.state.cost} BYN</h4>
                    <p>Когда: {date.toLocaleDateString()}</p>
                    <p>Откуда: {this.state.placeFrom}</p>
                    <p>Куда: {this.state.placeTo}</p>
                    <p>Описание: {this.state.aboutTour}</p>
                    <p>Транспорт: {this.state.transport}</p>
                    <p>Длительность часов: {this.state.duration} ч.</p>
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
