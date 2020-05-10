import React, { Component } from 'react';
import { Track, Button } from '../../../components';

import { ServiceProviderContext } from '../../../lib/service-provider-context';
import { SpotifyService } from '../../../services/spotify-service';

import { EMPTY_PLAYLIST_TEXT, } from '../../../constants'

class PlaylistView extends Component {
    static contextType = ServiceProviderContext;

    handleSave = (playlist) => {
        const name = prompt("Pick a name for your playlist");
        this.context.get(SpotifyService).createPlaylist(name).then(
            emptyPlaylist => this.context.get(SpotifyService).populatePlaylist(emptyPlaylist.id, playlist)
        );
    }

    render() {
        const { playlist, playlistRemoveTrackHandler } = this.props
        const tracks = playlist.map(track => <div className="playlist-item"><Track track={track} /><Button buttonType='removeButton'
            onClick={() => { playlistRemoveTrackHandler(track) }} /></div>)
        return (
            <div className="playlistview">
                <div className="playlist-wrapper">
                    {tracks.length > 0 ? tracks : <span>{EMPTY_PLAYLIST_TEXT}</span>}
                </div>

            </div>
        );
    }
}

export default PlaylistView;
