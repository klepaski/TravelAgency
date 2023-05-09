import React, { Component } from 'react';

export class CreateTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "", nameIsValid: false,
            countryFrom: "", countryFromIsValid: false,
            countryTo: "", countryToIsValid: false,
            duration: 0, durationIsValid: false,
            cost: 0, costIsValid: false,
            imagePath:[],
            aboutTour:"", aboutTourIsValid: false,
            transport:"",  transportIsValid: false,
            dateStart: new Date(), dateStartIsValid: false,
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangecountryFrom = this.onChangecountryFrom.bind(this);
        this.onChangecountryTo = this.onChangecountryTo.bind(this);
        this.onChangeTransport = this.onChangeTransport.bind(this);
        this.onChangeAboutTour = this.onChangeAboutTour.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    validateName(name) {
        return name.length > 2 && name.length <= 70;
    }

    onChangeName(e) {
        let val = e.target.value;
        let valid = this.validateName(val);
        this.setState({ name: val, nameIsValid: valid });
    }

    validatecountryFrom(countryFrom) {
        return countryFrom.length > 2 && countryFrom.length <= 70;
    }

    onChangecountryFrom(e) {
        let val = e.target.value;
        let valid = this.validatecountryFrom(val);
        this.setState({ countryFrom: val, countryFromIsValid: valid });
    }
    validatecountryTo(countryTo) {
        return countryTo.length > 2 && countryTo.length <= 70;
    }

    onChangecountryTo(e) {
        let val = e.target.value;
        let valid = this.validatecountryTo(val);
        this.setState({ countryTo: val, countryToIsValid: valid });
    }

    validateDuration(duration) {
        return duration > 0 && duration <= 20;
    }

    onChangeDuration(e) {
        let val = e.target.value;
        let valid = this.validateDuration(val);
        this.setState({ duration: val, durationIsValid: valid });
    }

    validateCost(cost) {
        return cost > 0 && cost < 1000000;
    }

    onChangeCost(e) {
        let val = e.target.value;
        let valid = this.validateCost(val);
        this.setState({ cost: val, costIsValid: valid });
    }

    validateDate(date) {
        let currentDate = new Date();
        let selectedDate = new Date(date);
        return selectedDate.getTime() > currentDate.getTime();
    }

    onChangeDate(e) {
        let val = e.target.value;
        let valid = this.validateDate(val);
        this.setState({ dateStart: val, dateStartIsValid: valid });
    }


    validateAboutTour(aboutTour) {
        return aboutTour.length >= 10 && aboutTour.length <= 2000;
    }

    onChangeAboutTour(e) {
        let val = e.target.value;
        let valid = this.validateAboutTour(val);
        this.setState({ aboutTour: val, aboutTourIsValid: valid });
    }

    validateTransport(transport) {
        return transport.length >= 2 && transport.length <= 30;
    }

    onChangeTransport(e) {
        let val = e.target.value;
        let valid = this.validateTransport(val);
        this.setState({ transport: val, transportIsValid: valid });
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

    // showFile(input){
    //     let file = input.files[0];
    //     //alert(`Last modified: ${file.lastModified}`);
    //     this.setState({imagePath: file.lastModified});
    // }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.nameIsValid == true && this.state.costIsValid == true &&
            this.state.durationIsValid == true && this.state.dateStartIsValid == true &&
            this.state.countryFromIsValid == true && this.state.countryToIsValid == true) {

            let form = new FormData();
            form.append('tourName', this.state.name);
            form.append('countryFrom', this.state.countryFrom);
            form.append('countryTo', this.state.countryTo);
            form.append('dateStart', this.state.dateStart);
            form.append('cost', this.state.cost);
            form.append('duration', this.state.duration);
            form.append('aboutTour', this.state.aboutTour);
            form.append('transport', this.state.transport);
            form.append('imagePath', this.state.imagePath);

            let url = "api/v1/tours";
            let method = 'POST';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("Тур создался успешно!!!");
                this.props.history.push('/toursA');
            } else {
                alert("ОШИБКА");
            }
        }
    }

    renderForm() {
        let nameColor = this.state.nameIsValid == true ? "green" : "red";
        let costColor = this.state.costIsValid == true ? "green" : "red";
        let durationColor = this.state.durationIsValid == true ? "green" : "red";
        let dateColor = this.state.dateStartIsValid == true ? "green" : "red";
        let countryFromColor = this.state.countryFromIsValid == true ? "green" : "red";
        let countryToColor = this.state.countryToIsValid == true ? "green" : "red";
        let aboutTourColor = this.state.aboutTourIsValid == true ? "green" : "red";
        let transportColor = this.state.transportIsValid == true ? "green" : "red";


        return (
            <div className="card mb-3">
                <div className="card-header text-center">
                    <h2>СОЗДАТЬ ТУР</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Название тура" className="form-control" onChange={this.onChangeName} style={{ borderColor: nameColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Цена" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Продолжительность" className="form-control" onChange={this.onChangeDuration} style={{ borderColor: durationColor }} />
                        </div>
                        <div className="form-group">
                            <input type="date" placeholder="Дата начала" className="form-control" onChange={this.onChangeDate} style={{ borderColor: dateColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Место отправления" className="form-control" onChange={this.onChangecountryFrom} style={{ borderColor: countryFromColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Место прибытия" className="form-control" onChange={this.onChangecountryTo} style={{ borderColor: countryToColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Транспорт" className="form-control" onChange={this.onChangeTransport} style={{ borderColor: transportColor }} />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Описание" className="form-control" onChange={this.onChangeAboutTour} style={{ borderColor: aboutTourColor }} />
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
        let date = new Date(this.state.dateStart)
       // let _this = this;

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
                    <div><img style={{maxWidth: '100%'}} src={atob(this.state.imagePath)} alt="Фото"/></div>                                                        
                </div>
            </div>
        );
    } //<div>{this.state.imagePath ? <img src={`data:image/jpg;base64,${this.state.imagePath}`}/>: ''} </div>
    //<div><img style={{maxWidth: '100%'}} src={(this.state.imagePath)} alt="imagePath"/></div> 

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
