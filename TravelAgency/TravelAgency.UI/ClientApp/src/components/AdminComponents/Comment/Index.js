import React, { Component } from 'react';
import { Table } from './Table';

export class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: new Array()
        };
    }

    async loadData() {
        let url = "api/v1/comments";

        let response = await fetch(url);

        if (response.ok) {
            let responseJson = response.json();

            responseJson.then(res => {
                this.setState({ list: res });
            });
        }
        else {
            alert(response.status);
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    render() {
        return (
            <section>
                <div className="mt-3">
                    <Table data={this.state.list} />
                </div>
            </section>
        );
    }
}
