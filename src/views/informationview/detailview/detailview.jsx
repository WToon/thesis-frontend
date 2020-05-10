import React, { Component } from 'react';
import { ItemDetails } from '../../../components';

class DetailView extends Component {
    render() {
        return (<ItemDetails details={this.props.details} attributes={this.props.attributes} />);
    }
}

export default DetailView;
