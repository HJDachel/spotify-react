import React, { Component } from 'react'
import format from 'date-fns/format';
import '../App.css';

export default class RecentTracks extends Component {

    TableItem = (item, index) => (
        <tr key={item.played_at}>
            <td>{index + 1}</td>
            <td>{item.track_name}</td>
            <td>{format(item.played_at, 'D MMM YYYY, hh:mma')}</td>
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
                        <th>Time</th>
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
