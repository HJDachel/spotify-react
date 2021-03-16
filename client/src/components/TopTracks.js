import React, { Component, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../App.css';

export default class TopTracks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            term: "short_term"
        }

        this.toggle = this.toggle.bind(this);
        this.setTermAndRefresh = this.setTermAndRefresh.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    tableItem = (track, index) => {
        return (
            <tr key={index}>
                <td>{index}</td>
                <td>{track.name}</td>
            </tr>
        )
    };

    topTracks = () => (
        <div className="top-tracks">
            <h2>Top Tracks</h2> {this.termDropDown()}
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Song title</th>
                    </tr>
                </thead>
                <tbody>{this.props.topTracks.map((e, index) => this.tableItem(e, index))}</tbody>
            </table>
        </div>
    );

    termDropDown = () => {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Dropdown
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Top Tracks Term</DropdownItem>
                    <DropdownItem onClick={ () => this.setTermAndRefresh("long_term")}>Long Term</DropdownItem>
                    <DropdownItem onClick={ () => this.setTermAndRefresh("medium_term")}>Medium Term</DropdownItem>
                    <DropdownItem onClick={ () => this.setTermAndRefresh("short_term")}>Short Term</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    };

    setTermAndRefresh(newTerm) {
        this.setState({ term: newTerm }, this.refreshTracks);
    }

    refreshTracks() {
        this.props.refreshTopTracks(this.state.term);
    }

    render() {
        return (
            <div>
                <this.topTracks></this.topTracks>
            </div>
        )
    }
}
