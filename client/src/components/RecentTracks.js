import React, { Component } from 'react'
import '../App.css';

export default class RecentTracks extends Component {

    TableItem = (item, index) => (
        <tr key={item.played_at}>
            <td>{index + 1}</td>
            <td>{item.track_name}</td>
        </tr>
    );

    RecentlyPlayed = () => (
        <div className="recently-played">
            <h2>Recent Tracks</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Song title</th>
                    </tr>
                </thead>
                <tbody>{this.props.musicHistory.map((e, index) => this.TableItem(e, index))}</tbody>
            </table>
        </div>
    );

    render() {
        return (
            <this.RecentlyPlayed>
            </this.RecentlyPlayed>
        )
    }
}
