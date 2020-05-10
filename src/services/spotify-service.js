import { buildUrl } from '../lib/util'
import { TRACKTYPE, ARTISTTYPE, BASE_ENDPOINT } from '../constants/constants'

export class SpotifyService {
    accessToken;
    authHeaders;
    user;

    configureAccessToken(accessToken) {
        this.accessToken = accessToken;
        this.authHeaders = { headers: { 'Authorization': `Bearer ${accessToken}` } };
    }

    configureUser() {
        const endpoint = new URL(BASE_ENDPOINT + '/me');
        fetch(endpoint, this.authHeaders).then(res => res.json()).then(user => this.user = user);
    }

    constructor(accessToken = null) {
        this.accessToken = accessToken;
        this.authHeaders = { headers: { 'Authorization': `Bearer ${accessToken}` } };
        this.user = null;
    }

    /**
     * Spotify search
     * @param {*} searchString
     */
    searchRequest(searchString) {
        const searchEndpoint = new URL(BASE_ENDPOINT + '/search');
        let params = [{ name: "q", value: searchString }, { name: "type", value: 'track' }, { name: "limit", value: 10 }];

        return fetch(buildUrl(searchEndpoint, params), this.authHeaders)
            .then(res => res.json());
    }

    getDetails(id, type) {
        return (type === ARTISTTYPE ?
            this.getArtistDetails(id)
            :
            this.getTrackDetails(id));
    }

    /**
     *  Get detailed information about a track in the spotify catalog '/audio-analysis'
     * @param {SpotifyID} trackID The SpotifyId of the track we want details about
     */
    getTrackDetails(trackID) {

        const endpoints = ['/tracks', '/audio-features', '/audio-analysis'];
        const requests = endpoints.map(endpoint =>
            fetch(new URL(BASE_ENDPOINT + endpoint + `/${trackID}`), this.authHeaders)
                .then(response => response.json())
        );
        return Promise.all(requests).then(responses => {
            return {
                type: TRACKTYPE,
                track: responses[0],
                audioFeatures: responses[1],
                audioAnalysis: responses[2]
            }
        });
    }

    /**
     * Get detailed information about an artist in the spotify catalog
     * @param {SpotifyID} artistID The SpotifyId of the artist we want details about
     */
    getArtistDetails(artistID) {
        const artistEndpoint = new URL(BASE_ENDPOINT + `/artists/${artistID}`);
        const topTracksEndpoint = new URL(artistEndpoint + '/top-tracks');
        const otherEndpoints = ['/albums', '/related-artists'];

        const artist = fetch(artistEndpoint, this.authHeaders).then(res => res.json());
        // TODO fetch required param country param from user profile
        const topTracks = fetch(buildUrl(topTracksEndpoint, [{ name: "country", value: "BE" }]), this.authHeaders).then(response => response.json());

        const otherRequests = otherEndpoints.map(endpoint =>
            fetch(new URL(artistEndpoint + endpoint), this.authHeaders).then(response => response.json()));

        return Promise.all([artist, topTracks].concat(otherRequests)).then(responses => {
            return { type: ARTISTTYPE, artist: responses[0], topTracks: responses[1], albums: responses[2], relatedArtists: responses[3] }
        });
    }

    /**
     * Get recommendations
     * @param {[artistObject|genreObject|trackObject]} seeds The seeds for the recommendations. In total 5 items of type are allowed
     * @param {*} attributes The attributes for the recommendations
     */
    getRecommendations(seeds, attributes) {
        const recommendationEndpoint = new URL(BASE_ENDPOINT + `/recommendations`);
        const params = [...attributes,
        { name: "market", value: ["from_token"] },
        { name: "limit", value: "100" },
        { name: "seed_artists", value: seeds.filter(seed => seed.type === ARTISTTYPE).map(artist => artist.id) },
        { name: "seed_tracks", value: seeds.filter(seed => seed.type === TRACKTYPE).map(track => track.id) }];

        return fetch(buildUrl(recommendationEndpoint, params), this.authHeaders)
            .then(res => res.json()).then(recommendations => { return { recommendations } });
    }

    /**
     * create playlist
     */
    createPlaylist(name) {
        const endpoint = new URL(BASE_ENDPOINT + `/users/${this.user.id}/playlists`);
        const data = { 'name': name };
        const headers = { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' };
        const config = { method: 'POST', headers, body: JSON.stringify(data) }

        return fetch(endpoint, config).then(res => res.json());
    }

    /**
     * Add the given tracks to the playlist
     * @param {*} playlistID
     * @param {*} tracks
     */
    populatePlaylist(playlistID, tracks) {
        const endpoint = new URL(BASE_ENDPOINT + `/playlists/${playlistID}/tracks`);
        const uris = {uris: tracks.map(track => track.uri)};
        const headers = { 'Authorization': `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' };
        const config = { method: 'POST', headers, body: JSON.stringify(uris) }

        fetch(endpoint, config);
    }

    /**
     * save playlist
     */
    savePlaylist() { }
}
