import React, { Component } from 'react';

import { TRACKTYPE, ARTISTTYPE } from '../../constants'
import { TrackDetails, ArtistDetails } from '..';

class ItemDetails extends Component {
    render() {
        return (
            <div className="details-wrapper">
                {this.props.details.type === TRACKTYPE && <TrackDetails className="trackdetails" details={this.props.details} attributes={this.props.attributes}/>}
                {this.props.details.type === ARTISTTYPE && <ArtistDetails className="artistdetails" details={this.props.details} />}
            </div>
        );
    }
}

export default ItemDetails;
