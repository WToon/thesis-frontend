import React, { Component } from 'react';

class Track extends Component {

    render() {
        const { name, artists, album } = this.props.track
        let imgSrc = ""
        if (album.images[0].url) { imgSrc = album.images[0].url }

        return (
            <div className="track-wrapper">
                <img className="picture" src={imgSrc} alt={"no pic for this track"} />
                <div className="trackinfo">
                    <span className="tracktitle">{name}</span>
                    {
                        this.props.type && this.props.type === "seed" ?
                            <span className="artists">{artists[0].name}</span>
                            :
                            <span className="artists">{artists.map(artist => artist.name).join(", ")}</span>

                    }
                </div>
            </div>
        );
    }
}

export default Track;
