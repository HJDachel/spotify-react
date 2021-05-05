import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Graph } from 'react-d3-graph';

export default class ArtistGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    myConfig = {
        nodeHighlightBehavior: true,
        node: {
          color: "lightgreen",
          size: 500,
          highlightStrokeColor: "blue",
        },
        link: {
          highlightColor: "lightblue",
        },
      };
    
    render() {
        return (
            <div>
                <Graph
                    id="artist-graph"
                    data={this.buildGraphDS()}
                    config={this.myConfig}
                />
            </div>
        )
    }

    buildGraphDS() {
        if (this.props.artists.length > 0) {
            const data = {
                nodes: [{id: this.props.artists[0].name, x:300, y:150}],
                links: []
            }
            return data;
        }
    }

}
