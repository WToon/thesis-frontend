import React, { Component } from 'react';
import { ItemDetails } from '../../../components';

class DetailView extends Component {
    render() {
        return (
            <>
                {(!this.props.details.track) && <span style={{margin:"20px", display:"inline-block"}} >Select a song for which you would like extra information</span >}
                <ItemDetails details={this.props.details} attributes={this.props.attributes} />
            </>
        );
    }
}

export default DetailView;
