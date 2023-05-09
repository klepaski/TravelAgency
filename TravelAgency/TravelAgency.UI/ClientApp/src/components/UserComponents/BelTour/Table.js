import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Telega.css'
import './backgr.css'


class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.dateStart)
        return (
            
            <div className="card mb-3 shadow">
                <div className="card-header text-center">
                    <h2>{this.props.belTourName}</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="text-justify col-lg-12">
                            <dl className="row">

                                <dt className="col-sm-4">
                                    <img style={{ width: '100%', display: 'block', marginRight: 'auto', marginLeft: 'auto' }} style={{ maxWidth: '100%' }} src={atob(this.props.imagePath)} />
                                </dt>

                                <dt className="col-sm-3">
                                    Цена: <br />
                                    {this.props.sale > 0 ? <h8 style={{ color: "red" }}>Со скидкой {this.props.sale}%:<br /></h8> : <span></span>}
                                    Дата отправления: <br />
                                    Длительность: <br />
                                    Место отправления: <br />
                                    Место прибытия: <br />
                                    Транспорт: <br />
                                    Описание тура: <br />
                                </dt>

                                <dd className="col-sm-5">
                                    {this.props.cost} BYN <br />
                                    {this.props.sale > 0 ? <h8 style={{ color: "red" }}><b>{this.props.cost * (100 - this.props.sale) / 100} BYN</b><br /></h8> : <span></span>}
                                    {date.toLocaleDateString()}<br />
                                    {this.props.duration} дней<br />
                                    {this.props.placeFrom}<br />
                                    {this.props.placeTo}<br />
                                    {this.props.transport}<br />
                                    {this.props.aboutTour}<br />
                                </dd>                               
                            </dl>
                    </div>
                      
                    </div>
                </div>
                <div className="tour_vkl">
					<p>&nbsp;</p>
		        <p className="desk_tel tel_sht">
			        <span id="stickcall" className="call-from-site on-mob">
				        <i id="stickcalli" className="fa fa-phone"></i>
			        </span>Звоните прямо сейчас!
                        <a href="tel:+375 33 318 62 23">+375 33 318 62 23</a></p>

                <p className="mob_tel tel_sht">
	                <span id="stickcall" className="call-from-site on-mob">
                     <i id="stickcalli" className="fa fa-phone"></i>
                    </span>Звоните прямо сейчас! <br></br>
	               <a href="tel:+375 33 318 62 23">+375 33 318 62 23</a></p>
                    <p>&nbsp;</p>
				</div>
 
            </div>
        );
    }
}

export class TableBU extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.data.length == 0) {
            return (
                <div className="text-center">
                    <h1></h1>
                </div>
            );
        }

        return (
            <div className="mt-2">
                {
                    this.props.data.map(function (item) {
                        return <Item
                        key={item.belTourId}
                        id={item.belTourId}
                        belTourName={item.belTourName}
                        duration={item.duration}
                        dateStart={item.dateStart}
                        cost={item.cost}
                        sale={item.sale}
                        placeFrom={item.placeFrom}
                        placeTo={item.placeTo}
                        transport={item.transport}
                        aboutTour={item.aboutTour}
                        imagePath={item.imagePath}
                        />
                    })
                }
            </div>
        );
    }
}
