import React, { Component } from 'react';
import { Table } from './Table';
import { Pagination } from '../../SharedComponents/Pagination';

export class TourAB extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: new Array(),
            tempList: [],
            pageSize: 5,
            pageCurrent: 1,
            pageTotal: 1,
            totalRecords: 0
        };

        this.firstPage = this.firstPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.changeSizePage = this.changeSizePage.bind(this);
    }

    firstPage = async function () {
        let pageCurrent = 1;
        let pageSize = this.state.pageSize;

        let url = "api/v1/belToursTemp/" + +pageSize + '/' + +pageCurrent;

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
            let url = "api/v1/belToursTemp/" + +pageSize + '/' + +pageCurrent;
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
            let url = "api/v1/belToursTemp/" + pageSize + '/' + pageCurrent;
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

            let url = "api/v1/belToursTemp/" + pageSize + '/' + pageCurrent;
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

        let url = "api/v1/belToursTemp/" + pageSize + '/' + pageCurrent;
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

    render() {
        return (
            <section>
                <div className="mt-3">
                    <Table data={this.state.tempList} />
                </div>
                <div className="mt-3">
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
            </section>
        );
    }
}
