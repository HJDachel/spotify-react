import React, { Component } from 'react';
import { Row, Col, Input, 
    Table, InputGroup, InputGroupAddon, 
    Button } from 'reactstrap';
import ArtistCard from './ArtistCard';
import ArtistGraph from './ArtistGraph';

export default class ArtistSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            artists: [],
            artistsToGraph: []
        };

        this.search = this.search.bind(this);
        this.addArtist = this.addArtist.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.removeArtist = this.removeArtist.bind(this);
        this.addToArtistGraph = this.addToArtistGraph.bind(this);
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <InputGroup>
                            <Input
                                placeholder="Search for an artist by name"
                                value={this.state.value}
                                onChange={this.search}
                            />
                            <InputGroupAddon addonType="append"><Button outline onClick={this.clearSearch}>×</Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderResults()}
                    </Col>
                </Row>
                <Row>
                    {this.renderGraph()}
                </Row>
                <Row>
                    {this.renderArtists()}
                </Row>
            </>
        )
    }

    renderResults() {
        const artistNames = this.props.artistSearchResults;
        const table = (artistNames.items !== undefined) ? artistNames.items.map(artist => {
            return (
                <tr>
                    <td onClick={() => this.setState({ artists: [...this.state.artists, artist] })} key={artist.id}>
                        {artist.name}
                    </td>
                </tr>
            );
        })
            : null;

        return (
            <Table className='table-dark' bordered hover>
                <tbody>
                    {table}
                </tbody>
            </Table>
        );
    }

    search(event) {
        const newVal = event.target.value;
        this.setState({ value: newVal });
        this.props.searchArtists(newVal, 10);
    }

    addArtist(artist) {
        this.setState({ artists: [...this.state.artists, artist] });
    }

    clearSearch() {
        this.setState({value: ''});
        this.props.clearSearchResults();
    }

    renderArtists() {
       return (this.state.artists.length !== 0) ? this.state.artists.map((artist) => {
            return(
                <Col>
                    <ArtistCard artist={artist} 
                        removeArtist={this.removeArtist}
                        addToArtistGraph={this.addToArtistGraph}
                        />
                </Col>
            );
        })
        : null;
    }

    removeArtist(id) {
        const newArtists = this.state.artists.filter( (artist) => {
            return artist.id !== id;
        });
        this.setState({artists: newArtists});
    }

    addToArtistGraph(artist) {
        const newArr = [...this.state.artistsToGraph, artist];
        this.setState({artistsToGraph: newArr});
    }

    renderGraph() {
        return (this.state.artistsToGraph.length > 0) ? (
            <ArtistGraph artists={this.state.artistsToGraph}/>
        ) : null;
    }
}
