import React, { Component } from 'react';

export class Search extends Component {
    constructor(props) {
        super(props);

        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(e) {
        let text = e.target.value.trim();

        this.props.filter(text);
    }

    render() {
        return (
            <input placeholder="Поиск" className="form-control" onChange={this.onTextChanged} />
        );
    }
}
