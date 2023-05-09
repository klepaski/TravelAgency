import React, { Component } from 'react';

export class UpdateTour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourId: 0,
            name: "", nameIsValid: true,
            countryFrom: "", countryFromIsValid: true,
            countryTo: "", countryToIsValid: true,
            duration: 0, durationIsValid: true,
            cost: 0, costIsValid: true,
            sale: 0, saleIsValid: true,
            imagePath:[],
            aboutTour:"", aboutTourIsValid: true,
            transport:"",  transportIsValid: true,
            isHotTour: 0, isHotTourIsValid: true,
            dateStart: new Date(), dateStartIsValid: true,
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeSale = this.onChangeSale.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangecountryFrom = this.onChangecountryFrom.bind(this);
        this.onChangecountryTo = this.onChangecountryTo.bind(this);
        this.onChangeTransport = this.onChangeTransport.bind(this);
        this.onChangeAboutTour = this.onChangeAboutTour.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeIsHotTour = this.onChangeIsHotTour.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.updateHotRadioBox = this.updateHotRadioBox(this);
    }
    updateHotRadioBox(){
        debugger
       let array = document.getElementsByName("options");
       let frbutton;
       for(let i = 0; i < array.length; i++) {
           if(array[i].value == this.state.isHotTour) {
               frbutton = array[i];
           }
       }
       debugger;
       frbutton.checked = true;
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

    validateCost(cost) {
        return cost > 0 && cost < 50000;
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

    validateIsHotTour(isHotTour) {
        return isHotTour >= 0 && isHotTour < 2;
    }

    onChangeIsHotTour(e) {
        debugger
        let val = e.target.value;
        let valid = this.validateIsHotTour(val);
        this.setState({ isHotTour: val, isHotTourIsValid: valid });
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
            this.state.durationIsValid == true && this.state.dateStartIsValid == true &&
            this.state.countryFromIsValid == true, this.state.transportIsValid == true, 
            this.state.countryToIsValid == true, this.state.aboutTourIsValid == true, this.state.saleIsValid == true) {

            let form = new FormData();
            form.append('tourId', this.state.tourId);
            form.append('tourName', this.state.name);
            form.append('countryFrom', this.state.countryFrom);
            form.append('countryTo', this.state.countryTo);
            form.append('dateStart', this.state.dateStart);
            form.append('cost', this.state.cost);
            form.append('sale', this.state.sale);
            form.append('duration', this.state.duration);
            form.append('aboutTour', this.state.aboutTour);
            form.append('transport', this.state.transport);
            form.append('imagePath', this.state.imagePath);
            form.append('isHotTour', this.state.isHotTour);
           
            let url = "api/v1/tours";
            let method = 'PUT';

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                body: form
            })

            if (response.ok) {
                alert("Обновление прошло успешно!!!");
                this.props.history.push('/toursA');
            } else {
                alert("Ошибка!!");
            }
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
                sale: results.sale,
                countryFrom: results.countryFrom,
                countryTo: results.countryTo,
                transport: results.transport,
                aboutTour: results.aboutTour,
                imagePath: results.imagePath,
                isHotTour: results.isHotTour
            }));            
        }
    }

    async componentDidMount() {
        await this.loadData();
        //await this.updateHotRadioBox();
    }

    renderForm() {
        let nameColor = this.state.nameIsValid === true ? "green" : "red";
        let costColor = this.state.costIsValid === true ? "green" : "red";
        let durationColor = this.state.durationIsValid === true ? "green" : "red";
        let dateColor = this.state.dateStartIsValid === true ? "green" : "red";
        let countryFromColor = this.state.countryFromIsValid === true ? "green" : "red";
        let countryToColor = this.state.countryToIsValid === true ? "green" : "red";
        let aboutTourColor = this.state.aboutTourIsValid == true ? "green" : "red";
        let transportColor = this.state.transportIsValid == true ? "green" : "red";
        let saleColor = this.state.saleIsValid === true ? "green" : "red";

         
        return (
            <div className="card mb-3">
                <div className="card-header text-center">
                    <h2>ИЗМЕНИТЬ ТУР</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" value={this.state.name} placeholder="Тур" className="form-control" onChange={this.onChangeName} style={{ borderColor: nameColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.cost}  placeholder="Цена" className="form-control" onChange={this.onChangeCost} style={{ borderColor: costColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.sale}  placeholder="Для горящего тура введите скидку" className="form-control" onChange={this.onChangeSale} style={{ borderColor: saleColor }} />
                        </div>
                        <div className="form-group">
                            <input type="number" value={this.state.duration} placeholder="Продолжительность" className="form-control" onChange={this.onChangeDuration} style={{ borderColor: durationColor }} />
                        </div>
                        <div className="form-group">
                            <input type="date" value={this.state.dateStart}  placeholder="Дата начала" className="form-control" onChange={this.onChangeDate} style={{ borderColor: dateColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" value={this.state.countryFrom} placeholder="Страна отправления" className="form-control" onChange={this.onChangecountryFrom} style={{ borderColor: countryFromColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" value={this.state.countryTo} placeholder="Страна прибытия" className="form-control" onChange={this.onChangecountryTo} style={{ borderColor: countryToColor }} />
                        </div>
                        <div className="form-group">
                            <input type="text" value={this.state.transport} placeholder="Транспорт" className="form-control" onChange={this.onChangeTransport} style={{ borderColor: transportColor }} />
                        </div>
                        <div className="btn-group form-group" data-toggle="buttons">
                            <label className="btn btn-success active">
                                <input type="radio" name="options" id="option1" value="0" onChange={this.onChangeIsHotTour} autocomplete="off"/> Основной тур
                            </label>
                            <label className="btn btn btn-warning">
                                <input type="radio" name="options" id="option2" value="1" onChange={this.onChangeIsHotTour} autocomplete="off"/> Горящий тур
                            </label>
                        </div>
                        <div className="form-group">
                            <textarea value={this.state.aboutTour} placeholder="Описание" className="form-control" onChange={this.onChangeAboutTour} style={{ borderColor: aboutTourColor }} />
                        </div>
                        <div className="form-group">    
                            <div>  
                                <input type="file" name="imagePath"  onChange={e => this.setFile(e)} /> 
                            </div>    
                        </div> 
                        <input type="submit" value="Сохранить" className="btn btn-success" />
                    </form>
                </div>
            </div>

        ); //multiple="multiple"
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
                    <p>{this.state.sale > 0 ? <p>Скидка на тур {this.state.sale}%</p> : <p>На данный тур скидка не предусмотрена</p>}</p>
                    <p>{date.toLocaleDateString()}</p>
                    <p>{this.state.countryFrom}</p>
                    <p>{this.state.countryTo}</p>
                    <p>{this.state.duration} дней</p>
                    <p>{this.state.transport}</p>
                    <p>{this.state.aboutTour}</p>
                    <p>{this.state.isHotTour == 1 ? <p>Горящий тур</p> : <p>Основной тур</p>}</p>
                    <div><img style={{maxWidth: '100%'}} src={atob(this.state.imagePath)} alt="Фото"/></div>                    
                </div>
            </div>
        );
    }
    //<img style={{maxWidth: '100%'}} src={(atob(this.state.imagePath))} alt="image" />

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
