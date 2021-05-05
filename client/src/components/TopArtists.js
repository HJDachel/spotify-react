import React, { Component } from 'react';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class TopArtists extends Component {
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

    tableItem = (artist, index) => {
        return (
            <tr key={index}>
                <td>{index}</td>
                <td>{artist.name}</td>
            </tr>
        )
    };

    topArtists = () => (
        <div >
            <h2>Top Artists</h2> {this.termDropDown()}
            <Table className='table-dark'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>{this.props.topArtists.map((e, index) => this.tableItem(e, index))}</tbody>
            </Table>
        </div>
    );

    termDropDown = () => {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Time Period
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Top Artists Term</DropdownItem>
                    <DropdownItem onClick={() => this.setTermAndRefresh("long_term")}>Long Term</DropdownItem>
                    <DropdownItem onClick={() => this.setTermAndRefresh("medium_term")}>Medium Term</DropdownItem>
                    <DropdownItem onClick={() => this.setTermAndRefresh("short_term")}>Short Term</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    };

    setTermAndRefresh(newTerm) {
        this.setState({ term: newTerm }, this.refreshArtists);
    }

    refreshArtists() {
        this.props.refreshTopArtists(this.state.term);
    }

    render() {
        return (
            <div>
                <this.topArtists></this.topArtists>
            </div>
        )
    }
}
