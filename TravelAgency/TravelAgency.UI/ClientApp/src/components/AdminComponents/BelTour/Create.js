import React, { Component } from 'react';

export class CreateBelTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            belTourName: "", belTourNameIsValid: false,
            placeFrom: "", placeFromIsValid: false,
            placeTo: "", placeToIsValid: false,
            duration: 0, durationIsValid: false,
            cost: 0, costIsValid: false,
            sale : 0, saleIsValid: false,
            imagePath:[],
            aboutTour:"", aboutTourIsValid: false,
            transport:"",  transportIsValid: false,
            dateStart: new Date(), dateStartIsValid: false,
        }

        this.onChangeBelTourName = this.onChangeBelTourName.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeSale = this.onChangeSale.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeplaceFrom = this.onChangeplaceFrom.bind(this);
        this.onChangeplaceTo = this.onChangeplaceTo.bind(this);
        this.onChangeTransport = this.onChangeTransport.bind(this);
        this.onChangeAboutTour = this.onChangeAboutTour.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    validateBelTourName(belTourName) {
        return belTourName.length > 2 && belTourName.length <= 70;
    }

    onChangeBelTourName(e) {
        let val = e.target.value;
        let valid = this.validateBelTourName(val);
        this.setState({ belTourName: val, belTourNameIsValid: valid });
    }

    validateplaceFrom(placeFrom) {
        return placeFrom.length > 2 && placeFrom.length <= 70;
    }

    onChangeplaceFrom(e) {
        let val = e.target.value;
        let valid = this.validateplaceFrom(val);
        this.setState({ placeFrom: val, placeFromIsValid: valid });
    }
    validateplaceTo(placeTo) {
        return placeTo.length > 2 && placeTo.length <= 70;
    }

    onChangeplaceTo(e) {
        let val = e.target.value;
        let valid = this.validateplaceTo(val);
        this.setState({ placeTo: val, placeToIsValid: valid });
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

    validateSale(sale) {
        return sale >= 0 && sale < 100;
    }

    onChangeSale(e) {
        let val = e.target.value;
        let valid = this.validateSale(val);
        this.setState({ sale: val, saleIsValid: valid });
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

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.belTourNameIsValid == true && this.state.costIsValid == true &&
            this.state.durationIsValid == true && this.state.dateStartIsValid == true &&
            this.state.placeFromIsValid == true && this.state.placeToIsValid == true && 
            this.state.saleIsValid == true) {

            let form = new FormData();
            debugger
            form.append('belTourName', this.state.belTourName);
            form.append('placeFrom', this.state.placeFrom);
            form.append('placeTo', this.state.placeTo);
            form.append('dateStart', this.state.dateStart);
            form.append('sale', this.state.sale);
            form.append('cost', this.state.cost);
            form.append('duration', this.state.duration);
            form.append('aboutTour', this.state.aboutTour);
            form.append('transport', this.state.transport);
            form.append('imagePath', this.state.imagePath);

            let url = "api/v1/belTours";
            let method = 'POST';
debugger
            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("Тур создался успешно!!!");
                this.props.history.push('/toursAB');
            } else {
                alert("ОШИБКА");
            }
        }
    }

    renderForm() {
        let belTourNameColor = this.state.belTourNameIsValid == true ? "green" : "red";
        let costColor = this.state.costIsValid == true ? "green" : "red";
        let durationColor = this.state.durationIsValid == true ? "green" : "red";
        let dateColor = this.state.dateStartIsValid == true ? "green" : "red";
        let placeFromColor = this.state.placeFromIsValid == true ? "green" : "red";
        let placeToColor = this.state.placeToIsValid == true ? "green" : "red";
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
                            <input type="text" placeholder="Название тура" className="form-control" onChange={this.onChangeBelTourName} style={{ borderColor: belTourNameColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Цена" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Скидка на тур" className="form-control" onChange={this.onChangeSale} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Продолжительность" className="form-control" onChange={this.onChangeDuration} style={{ borderColor: durationColor }} />
                        </div>
                        <div className="form-group">
                            <input type="date" placeholder="Дата начала" className="form-control" onChange={this.onChangeDate} style={{ borderColor: dateColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Место отправления" className="form-control" onChange={this.onChangeplaceFrom} style={{ borderColor: placeFromColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Место прибытия" className="form-control" onChange={this.onChangeplaceTo} style={{ borderColor: placeToColor }} />
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
                    <h3>{this.state.belTourName}</h3>
                    <p>{this.state.cost}BYN</p>
                    <p>{this.state.sale}%</p>
                    <p>{date.toLocaleDateString()}</p>
                    <p>{this.state.placeFrom}</p>
                    <p>{this.state.placeTo}</p>
                    <p>{this.state.aboutTour}</p>
                    <p>{this.state.transport}</p>
                    <p>{this.state.duration} часов</p>
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
