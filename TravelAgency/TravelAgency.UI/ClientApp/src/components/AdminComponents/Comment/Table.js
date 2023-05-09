import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);

        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    async updateComment() {
        let form = new FormData();
        form.append('commentId', this.props.id);

        let url = "api/v1/comments";
        let method = 'PUT';

        let response = await fetch(url, {
            method: method,
            mode: 'cors',
            body: form
        })

        if (response.ok) {
            alert("Комментарий успешно одобрен!");
        } else {
            alert("Error");
        }
    }

    async deleteComment() {
        let url = "api/v1/comments/" + this.props.id;
        let method = 'DELETE';

        let response = await fetch(url, {
            method: method,
            mode: 'cors'
        });

        if (response.ok) {
            alert('Комментарий успешно удален!');
        } else {
            alert("Ошибка");
        }
    }

    render() {
        return (
            <tr>
                <td><b>{this.props.name}</b></td>
                <td>
                    <input type="button" value="Принять" className="btn btn-outline-warning" onClick={this.updateComment} />
                </td>
                <td>
                    <input type="button" value="Удалить" className="btn btn-outline-danger" onClick={this.deleteComment} />
                </td>
            </tr>
        );
    }
}

export class Table extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="text-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th>СООБЩЕНИЕ</th>
                            <th>ПОДТВЕРДИТЬ</th>
                            <th>УДАЛИТЬ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(function (item) {
                                return <Item key={item.commentId} id={item.commentId} name={item.message} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>СООБЩЕНИЕ</th>
                            <th>ПОДТВЕРДИТЬ</th>
                            <th>УДАЛИТЬ</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
