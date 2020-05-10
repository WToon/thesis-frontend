import React, { Component } from 'react';
import PlaylistView from './playlistview/playlistview';
import DetailView from './detailview/detailview';
import { Button } from '../../components';
import { ServiceProviderContext } from '../../lib/service-provider-context';
import { SpotifyService } from '../../services/spotify-service';
class InformationView extends Component {
    static contextType = ServiceProviderContext;

    handleSave = (playlist) => {
        const name = prompt("Pick a name for your playlist");
        this.context.get(SpotifyService).createPlaylist(name).then(
            emptyPlaylist => this.context.get(SpotifyService).populatePlaylist(emptyPlaylist.id, playlist)
        );
    }

    render() {
        const { details, playlist, playlistViewHandler, playlistIsOpen, playlistDeleteHandler, playlistRemoveTrackHandler, attributes } = this.props
        return (
            <div className="informationview-container">
                <div className="title">{playlistIsOpen ? "Playlist" : "Details"}</div>
                <div className="information-view" >
                    {playlistIsOpen ? <PlaylistView playlist={playlist} playlistRemoveTrackHandler={playlistRemoveTrackHandler} />
                        : <DetailView details={details} attributes={attributes} />}
                </div>
                {
                    (!playlistIsOpen) ?
                        <div className="playlist-toggle">
                            <Button buttonType="playlistSwitch" onClick={playlistViewHandler}>{playlistIsOpen ? "View details" : `View playlist: ${playlist.length} tracks`}</Button>
                        </div> :
                        <div className="playlist-save-delete">
                            <Button buttonType="saveButton" onClick={() => this.handleSave(playlist)} />
                            <Button buttonType="deleteButton" onClick={() => playlistDeleteHandler()} />
                            <Button buttonType={`playlistSwitch ${playlistIsOpen && "returnButton"}`}
                                onClick={playlistViewHandler}>{!playlistIsOpen && `View playlist: ${playlist.length} tracks`}</Button>
                        </div>
                }
            </div >
        );
    }
}

export default InformationView;
