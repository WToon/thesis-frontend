import React, { Component } from 'react';

class ArtistDetails extends Component {
    render() {
        // albums also possible
        const { artist, topTracks, relatedArtists } = this.props.details
        return (
            <div>
                <div className="artistdetails info">
                {artist.images[0] && <img src={artist.images[0].url} alt={"alt"} width="80px" />}
                    <span>Name: {artist.name}</span>
                    <span>Genres: {artist.genres.join(", ")}</span>
                    <span>Popularity: {artist.popularity}</span>
                </div>
                <div className="artistdetails toptracks">
                    <span className="temp-titlespan">Top tracks</span>
                    {topTracks.tracks.map(track => <span key={track.id}>{track.name}</span>)}
                </div>
                <div className="artistdetails related-artists">
                    <span className="temp-titlespan">Related artists:</span>
                    {relatedArtists.artists.slice(8).map(artist => <span key={artist.id}>{artist.name}</span>)}
                </div>
                <div className="artistdetails albums">
                </div>
            </div>
        );
    }
}

export default ArtistDetails;
