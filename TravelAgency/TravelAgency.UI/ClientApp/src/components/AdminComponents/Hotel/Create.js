import React, { Component } from 'react';
import { post } from 'axios';    

export class CreateHotel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "", nameIsValid: false,
            description: "", descriptionIsValid: false,
            tourId: 0, tourIsValid: false,
            cost: 0, costIsValid: false,
            clas: 0, classIsValid: false,
            hotelSize: 0, sizeIsValid: false,
            tourList: [],
            imagePath: []
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
    validateImage(imagePath) {
        return imagePath > 0;
    }

    setFile(e) {    
        var render = new FileReader();
        render.readAsDataURL(e.target.files[0]);
        let _this=this;
        render.onload = function(){
            _this.setState({ imagePath: btoa(render.result)});
        }     
        //this.setState({ imagePath: e.target.files[0]});
    }
    
   
    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.nameIsValid == true && this.state.costIsValid == true &&
            this.state.descriptionIsValid == true && this.state.tourIsValid == true &&
            this.state.classIsValid == true, this.state.sizeIsValid) {

             console.log(this.state.imagePath);

            let form = new FormData();
            form.append('hotelName', this.state.name);
            form.append('cost', this.state.cost);
            form.append('tourId', this.state.tourId);
            form.append('description', this.state.description);
            form.append('class', this.state.clas);
            form.append('imagePath', this.state.imagePath);
            form.append('hotelSize', this.state.hotelSize);
            debugger;
            let url = "api/v1/hotels";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form,
                headers: {    
                    'Accept': 'application/json',       
            }
            })

            if (response.ok) {
                alert("Создание успешно!!!");
                this.props.history.push('/hotelsA');
            } else {
                alert("Ошибка");
            }            
        }
    }

    /*async submit(e){
        e.preventDefault();
        const url = "api/v1/images";
        const formData = new FormData();    
         formData.append('body', this.state.file);
         const config = {    
            headers: {    
                    'content-type': 'multipart/form-data',    
            },
        };
        return post(url, formData, config);
    }*/


    async loadData() {
        let url = "api/v1/tours";

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(results => this.setState({ tourList: results }));
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
                    <h2>СОЗДАТЬ НОВЫЙ ОТЕЛЬ</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Имя отеля" className="form-control" onChange={this.onChangeName} style={{ borderColor: nameColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Цена за сутки" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <select className="form-control" onChange={this.onChangeTour} style={{ borderColor: tourColor }}>
                                <option value="0">Выбрать тур</option>
                                {
                                    this.state.tourList.map(tour => {
                                        return <option key={tour.tourId} value={tour.tourId}>{tour.tourName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Количество звезд" className="form-control" onChange={this.onChangeClass} style={{ borderColor: classColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Количество мест в отеле" className="form-control" onChange={this.onchangeHotelSize} style={{ borderColor: sizeColor }} />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Описание" onChange={this.onChangeDescription} style={{ borderColor: descriptionColor }} className="form-control" />
                        </div>
                        <div className="form-group">    
                            <div>  
                                <input type="file" name="imagePath" multiple="multiple" onChange={e => this.setFile(e)} />    
                            </div>    
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
                    <p>Количество звезд: {this.state.clas}</p>
                    <textarea value={this.state.description} disabled className="form-control"></textarea>
                    <div className="card-body text-center">
                        <img style={{maxWidth: '100%'}} src={atob(this.state.imagePath)} alt="ФОТО"/>
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
;
