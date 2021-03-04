import React, { Component } from 'react'
import '../App.css';

export default class TopTracks extends Component {
    TableItem = (item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
        </tr>
    );

    TopTracks = () => (
        <div className="top-tracks">
            <h2>Recent Tracks</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Song title</th>
                    </tr>
                </thead>
                <tbody>{this.props.topTracks.map((e, index) => this.TableItem(e, index))}</tbody>
            </table>
        </div>
    );

    render() {
        return (
            <div>
                <this.TopTracks></this.TopTracks>
            </div>
        )
    }
}
