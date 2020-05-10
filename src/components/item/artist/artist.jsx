import React, { Component } from 'react';

import { IMGALT } from '../../../constants'

class Artist extends Component {
    render() {
        const { name, images } = this.props.artist
        return (
            <div className="artist-wrapper">
                {images[0] && <img className="picture" src={images[0].url} alt={IMGALT} />}
                <span className="artist-name">{name}</span>
            </div>
        );
    }
}

export default Artist;
