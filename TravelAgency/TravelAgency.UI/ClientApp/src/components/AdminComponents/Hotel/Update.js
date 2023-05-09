import React, { Component } from 'react';

export class UpdateHotel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotelId: 0,
            name: "", nameIsValid: true,
            description: "", descriptionIsValid: true,
            tourId: 0, tourIsValid: true,
            cost: 0, costIsValid: true,
            clas: 0, classIsValid: true,
            hotelSize: 0, sizeIsValid: true,
            tourList: [],
            imagePath:[]
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeTour = this.onChangeTour.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onchangeHotelSize = this.onchangeHotelSize.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateName(name) {
        return name.length > 2 && name.length <= 70;
    }

    onChangeName(e) {
        let val = e.target.value;
        let valid = this.validateName(val);
        this.setState({ name: val, nameIsValid: valid });
    }

    validateDescription(description) {
        return description.length > 2 && description.length <= 500;
    }

    onChangeDescription(e) {
        let val = e.target.value;
        let valid = this.validateDescription(val);
        this.setState({ description: val, descriptionIsValid: valid });
    }

    validateCost(cost) {
        return cost > 0 && cost <= 2000000;
    }

    onChangeCost(e) {
        let val = e.target.value;
        let valid = this.validateCost(val);
        this.setState({ cost: val, costIsValid: valid });
    }

    validateHotelSize(hotelSize) {
        return hotelSize > 0 && hotelSize <= 2000;
    }

    onchangeHotelSize(e) {
        let val = e.target.value;
        let valid = this.validateHotelSize(val);
        this.setState({ hotelSize: val, sizeIsValid: valid });
    }

    validateTour(tour) {
        return tour > 0;
    }

    onChangeTour(e) {
        let val = e.target.value;
        let valid = this.validateTour(val);
        this.setState({ tourId: val, tourIsValid: valid });
    }

    validateClass(clas) {
        return clas > 0 && clas < 6;
    }

    onChangeClass(e) {
        let val = e.target.value;
        let valid = this.validateClass(val);
        this.setState({ clas: val, classIsValid: valid });
    }

    setFile(e) {    
        var render = new FileReader();
        render.readAsDataURL(e.target.files[0]);
        let _this = this;
        render.onload = function(){
            _this.setState({ imagePath: btoa(render.result)});
           // _this.setState({ imagePath: window.btoa(unescape(encodeURIComponent(render.result)))});
        }     
       // this.setState({ imagePath: e.target.files[0]});
    }//btoa(render.result)

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.nameIsValid == true && this.state.costIsValid == true &&
            this.state.descriptionIsValid == true && this.state.tourIsValid == true &&
            this.state.classIsValid == true, this.state.sizeIsValid == true) {

            let form = new FormData();
            form.append('hotelId', this.state.hotelId);
            form.append('hotelName', this.state.name);
            form.append('cost', this.state.cost);
            form.append('tourId', this.state.tourId);
            form.append('description', this.state.description);
            form.append('class', this.state.clas);
            form.append('imagePath', this.state.imagePath);
            form.append('hotelSize', this.state.hotelSize);

            let url = "api/v1/hotels";
            let method = 'PUT';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("Обновление данных прошло успешно!!!");
                this.props.history.push('/hotelsA');
            } else {
                alert("Произошла ошибка при обновлении данных");
            }
        }
    }

    async loadData() {
        let url = "api/v1/tours";
        let urlHotel = "api/v1/hotels/" + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(results => this.setState({ tourList: results }));
        }

        let responseHotel = await fetch(urlHotel);

        if (responseHotel.ok) {
            let responseJson = responseHotel.json();

            responseJson.then(results => {
                console.log(results);
                this.setState({
                    hotelId: results.hotelId,
                    name: results.hotelName,
                    cost: results.cost,
                    clas: results.class,
                    description: results.description,
                    tourId: results.tourId,
                    hotelSize: results.hotelSize,
                    imagePath: results.imagePath
                })
            });
        }
        else {
            alert("hotel: " + responseHotel.status);
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    renderForm() {
        let nameColor = this.state.nameIsValid == true ? "green" : "red";
        let costColor = this.state.costIsValid == true ? "green" : "red";
        let descriptionColor = this.state.descriptionIsValid == true ? "green" : "red";
        let tourColor = this.state.tourIsValid == true ? "green" : "red";
        let classColor = this.state.classIsValid == true ? "green" : "red";
        let sizeColor = this.state.sizeIsValid == true ? "green" : "red";

        return (
            <div className="card mb-3">
                <div className="card-header text-center">
                    <h2>ОБНОВИТЬ ДАННЫЕ ОБ ОТЕЛЕ</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" value={this.state.name} placeholder="Отель" className="form-control" onChange={this.onChangeName} style={{ borderColor: nameColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.cost} placeholder="Цена" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <select value={this.state.tourId} className="form-control" onChange={this.onChangeTour} style={{ borderColor: tourColor }}>
                                <option value="0">Выбрать тур</option>
                                {
                                    this.state.tourList.map(tour => {
                                        return <option key={tour.tourId} value={tour.tourId}>{tour.tourName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.clas} placeholder="Звезды" className="form-control" onChange={this.onChangeClass} style={{ borderColor: classColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Количество мест в отеле" value={this.state.hotelSize} className="form-control" onChange={this.onchangeHotelSize} style={{ borderColor: sizeColor }} />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Description" value={this.state.description} onChange={this.onChangeDescription} style={{ borderColor: descriptionColor }} className="form-control" />
                        </div>
                        <div className="form-group">    
                            <input type="file" name="imagePath" onChange={e => this.setFile(e)} />
                        </div>
                        <input type="submit" value="Сохранить" className="btn btn-success" />
                    </form>
                </div>
            </div>

        );
    }

    renderCard() {
        return (
            <div className="card">
                <div className="card-header text-center">
                    <h2>ОТЕЛЬ</h2>
                </div>
                <div className="card-body text-center">
                    <h3>{this.state.name}</h3>
                    <p>Цена: {this.state.cost}$</p>
                    <p>Звезды: {this.state.clas}</p>
                    <textarea value={this.state.description} disabled className="form-control"></textarea>
                    <div className="card-body text-center">
                        <img style={{maxWidth: '100%'}} src={atob(this.state.imagePath)} alt="imagePath"/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
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
