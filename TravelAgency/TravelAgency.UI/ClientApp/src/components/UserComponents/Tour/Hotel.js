﻿import React, { Component } from 'react';
import { Pagination } from '../../SharedComponents/Pagination';
import { Search } from '../../SharedComponents/Search';
import { TableU } from '../../UserComponents/Hotel/Table';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card shadow m-3">

            </div>
        );
    }
}

export class TourHotel extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            list: new Array(),
            tempList: [],
            listTest: [],
            pageSize: 5,
            pageCurrent: 1,
            pageTotal: 1,
            totalRecords: 0
        };

        this.filterList = this.filterList.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.changeSizePage = this.changeSizePage.bind(this);
    }

    filterList(text) {
        let list = this.state.list;

        if (list.length != 0) {
            var filteredList = list.filter(function (item) {
                return item.hotelName.toLowerCase().search(text.toLowerCase()) !== -1;
            });

            this.setState({ tempList: filteredList });
        }
    }

    firstPage = async function () {
        let pageCurrent = 1;
        let pageSize = this.state.pageSize;

        let url = "api/v1/tourhotelsTemp/" + +pageSize + '/' + +pageCurrent + '/' + this.props.match.params.id;

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(res => {
                this.setState({ list: res[0], tempList: res[0], totalRecords: res[1], pageCurrent: pageCurrent })
                let pageTotal = Math.ceil(this.state.totalRecords / this.state.pageSize);
                this.setState({ pageTotal: pageTotal })
            });
        }
        else {
            alert(response.status);
        }
    }

    nextPage = async function () {
        let pageSize = this.state.pageSize;
        let pageCurrent = this.state.pageCurrent;
        let pageTotal = this.state.pageTotal;

        pageCurrent++;

        if (pageCurrent <= pageTotal) {
            let url = "api/v1/tourhotelsTemp/" + +pageSize + '/' + +pageCurrent + '/' + this.props.match.params.id;
            let response = await fetch(url)

            if (response.ok) {
                let responseJson = response.json();
                responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent }));
            }
            else {
                alert(response.status);
            }
        }
    }

    prevPage = async function () {
        let pageSize = this.state.pageSize;
        let pageCurrent = this.state.pageCurrent;

        pageCurrent--;

        if (pageCurrent >= 1) {
            let url = "api/v1/tourhotelsTemp/" + +pageSize + '/' + +pageCurrent + '/' + this.props.match.params.id;
            let response = await fetch(url);

            if (response.ok) {
                let responseJson = response.json();
                responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent }));
            }
            else {
                alert(response.status);
            }
        }
    }

    lastPage = async function () {
        let pageSize = this.state.pageSize;
        let pageCurrent = this.state.pageCurrent;
        let pageTotal = this.state.pageTotal;

        if (pageCurrent !== pageTotal) {
            pageCurrent = pageTotal;

            let url = "api/v1/tourhotelsTemp/" + +pageSize + '/' + +pageCurrent + '/' + this.props.match.params.id;
            let response = await fetch(url);

            if (response.ok) {
                let responseJson = response.json();
                responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent }));
            }
            else {
                alert(response.status);
            }
        }
    }

    changeSizePage = async function (e) {
        let pageSize = e.target.value;
        let pageCurrent = 1;

        let pageTotal = Math.ceil(this.state.totalRecords / pageSize);
        this.setState({ pageTotal: pageTotal });

        if (pageCurrent > pageTotal) {
            pageCurrent = pageTotal;
        }

        let url = "api/v1/tourhotelsTemp/" + +pageSize + '/' + +pageCurrent + '/' + this.props.match.params.id;
        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();
            responseJson.then(res => this.setState({ list: res[0], tempList: res[0], pageCurrent: pageCurrent, pageSize: pageSize }));
        }
        else {
            alert(response.status);
        }
    }

    async componentDidMount() {
        await this.firstPage();
    }

    renderSearch() {
        return (
            <div id="search">
                <Search filter={this.filterList} />
            </div>
        );
    }

    renderPagination() {
        return (
            <div id="pagination" className="mt-3 mb-3">
                <Pagination
                    pageTotal={this.state.pageTotal}
                    pageCurrent={this.state.pageCurrent}
                    nextPage={this.nextPage}
                    firstPage={this.firstPage}
                    prevPage={this.prevPage}
                    lastPage={this.lastPage}
                    changeSizePage={this.changeSizePage}
                />
            </div>
        );
    }

    render() {
        let contentSearch;
        let contentPagination;

        if (this.state.tempList != 0) {
            contentSearch = this.renderSearch();
            contentPagination = this.renderPagination();
        }

        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="jumbotron">
                            <h1 className="display-4 text-center">YU-TRAVEL♥ приветствует Вас</h1>
                            <p className="lead text-center">Здесь вы можете выбрать отель! Выберите отель и вперед в путешествие.</p>
                        </div>
                        <div className="">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <Link className="breadcrumb-item" to={`/`}>Главная</Link>
                                    <Link className="breadcrumb-item" to={`/toursU`}>Туры</Link>
                                    <li className="breadcrumb-item active" aria-current="page">Отели</li>
                                </ol>
                            </nav>
                        </div>
                        {
                            contentSearch
                        }
                        <div id="chapters" className="mt-3">
                            <TableU data={this.state.tempList} />
                        </div>
                        {
                            contentPagination
                        }
                    </div>
                </div>
            </div>
        );
    }
}
