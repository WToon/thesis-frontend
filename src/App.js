import React, { Component } from 'react';
import { InformationView, CenterView, SelectionView } from "./views";
import { ServiceProviderContext } from './lib/service-provider-context';
import { SpotifyService } from './services/spotify-service';

import { INITIAL_SLIDER_VALUE } from './constants'
import Completed from './views/completedview/completed';

class App extends Component {
    static contextType = ServiceProviderContext;
    // Recommendation fetch timeout
    timeout = null;

    state = {
        seeds: [],
        attributes: [
            { name: "danceability", value: INITIAL_SLIDER_VALUE * Math.random() + .1 },
            { name: "energy", value: INITIAL_SLIDER_VALUE * Math.random() + .1 },
            { name: "tempo", value: INITIAL_SLIDER_VALUE * Math.random() * 80 + 80 + 8 }],
        details: {},
        recommendations: {},
        playlist: [],
        playlistIsOpen: true,
        selecting: true,
        completed: false,
    };

    completedHandler = () => {
        this.setState({ completed: true })
    }

    // Handlers for selections made in searchView
    selectionAddHandler = (seed) => {
        if (this.state.seeds.length < 5) {
            const seeds = this.state.seeds.concat(seed);
            this.setState({ seeds });
            this.getRecommendations(seeds, this.state.attributes);
        } else { alert("You have already selected 5 seeds.") }
    };

    selectionRemoveHandler = (seed) => {
        const removeIndex = this.state.seeds.findIndex(item => item.id === seed.id);
        const seeds = [...this.state.seeds];
        seeds.splice(removeIndex, 1);
        this.setState({ seeds });
        this.getRecommendations(seeds, this.state.attributes);
    };

    // Handlers for liked tracks in recommendationView
    playlistAddHandler = (likedTrack) => {
        // Remove selected track from the list of recommendations
        const removeIndex = this.state.recommendations.tracks.findIndex(item => item.id === likedTrack.id);
        const recommendedTracks = [...this.state.recommendations.tracks];
        recommendedTracks.splice(removeIndex, 1);
        const recommendations = { ...this.state.recommendations, tracks: recommendedTracks }
        // Add selected track to the playlist
        const playlist = this.state.playlist.concat(likedTrack);
        this.setState({ playlist, recommendations });
    };

    playlistDeleteHandler = () => {
        if (window.confirm("Delete playlist?")) this.setState({ playlist: [] });
    }

    playlistRemoveTrackHandler = (track) => {
        const removeIndex = this.state.playlist.findIndex(item => item.id === track.id);
        const playlist = [...this.state.playlist];
        playlist.splice(removeIndex, 1);
        this.setState({ playlist });
    }

    // Handler for any requests for information (searchView and selectionView)
    informationRequestHandler = (id, type, e) => {
        e.preventDefault()
        // Instead update the details
        this.context.get(SpotifyService).getDetails(id, type).then(details => { this.setState({ details }) });
        // Close the open playlist display so the details become visible
        if (this.state.playlistIsOpen) { this.setState({ playlistIsOpen: false }) };
    };

    // Handler for changes to the attributes (selectionView)
    attributeChangeHandler = (value, attribute) => {
        if (attribute.name === "tempo") { value = value * 80 + 80 }
        const elementsIndex = this.state.attributes.findIndex(element => element.name === attribute.name);
        let newAttributes = [...this.state.attributes];
        newAttributes[elementsIndex] = { ...newAttributes[elementsIndex], value: value };
        this.setState({ attributes: newAttributes });
        // If user has finished adjusting his attribute, fetch recommendations with new attributes
        this.getRecommendations(this.state.seeds, newAttributes);
    };

    // Helper recommendation fetch function
    getRecommendations = (seeds, attributes) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(
            () => this.context.get(SpotifyService).getRecommendations(seeds, attributes).then(recommendations => this.setState(recommendations)), 150
        );
    };

    // Handler for displaying/hiding the users playlist
    playlistViewHandler = () => {
        this.setState({ playlistIsOpen: !this.state.playlistIsOpen, details: {} });
    };

    handleViewToggle = () => {
        !this.state.selecting || this.state.seeds.length > 0 ?
            this.setState({ selecting: !this.state.selecting }) : alert("Get started by selecting some seeds")
    }

    render() {
        return (
            <>
                {
                    this.state.completed ? <Completed></Completed> :

                        <div className="app-container" onContextMenu={e => e.preventDefault()}>
                            <SelectionView className="selection-view"
                                seeds={this.state.seeds} attributes={this.state.attributes} selecting={this.state.selecting} details={this.state.details}
                                onSelectionRemoveCallback={this.selectionRemoveHandler} onAttributeChangeCallback={this.attributeChangeHandler}
                                informationRequestCallback={this.informationRequestHandler} />

                            <CenterView className="center-view"
                                recommendations={this.state.recommendations} selecting={this.state.selecting} seeds={this.state.seeds} details={this.state.details}
                                onSelectionAddCallback={this.selectionAddHandler} informationRequestCallback={this.informationRequestHandler}
                                playlistAddHandler={this.playlistAddHandler} handleViewToggle={this.handleViewToggle} />

                            <InformationView className="information-view"
                                details={this.state.details} playlist={this.state.playlist} attributes={this.state.attributes}
                                playlistIsOpen={this.state.playlistIsOpen} playlistViewHandler={this.playlistViewHandler} completedHandler={this.completedHandler}
                                playlistDeleteHandler={this.playlistDeleteHandler} playlistRemoveTrackHandler={this.playlistRemoveTrackHandler} />
                        </div>
                }
            </>
        );
    }
}

export default App;
