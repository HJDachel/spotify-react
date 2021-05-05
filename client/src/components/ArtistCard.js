import React, { Component } from 'react';
import {
    Card,
    CardImg, 
    CardBody, 
    CardTitle,
    CardText,
    Button
} from 'reactstrap';

export default class ArtistCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }
    
    render() {
        return (
            <div>
                {this.renderArtistCard()}
            </div>
        )
    }

    renderArtistCard() {
        const artist = this.props.artist;
        return (
            <Card>
                {this.renderImage()}
                <CardBody>
                    <CardTitle>{artist.name}</CardTitle>
                    <CardText></CardText>
                    <Button color="danger" onClick={() => this.props.removeArtist(artist.id)}>×</Button>
                    <Button color="success" onClick={() => this.props.addToArtistGraph(artist)}>Add to Graph</Button>
                </CardBody>
            </Card>
        );
    }

    renderImage() {
        if (this.props.artist.images.length !== 0) {
            return (<CardImg top src={this.props.artist.images[0].url}/>);
        }else {
            return null;
        }
    }
}
