import querystring from 'querystring';
import { SpotifyService } from '../services/spotify-service';

export async function configInit(serviceProvider) {
    return new Promise(resolve => {
        loadAccessToken(serviceProvider);
        if (serviceProvider.get(SpotifyService).accessToken) resolve();
    }).then(() => {
        loadUserProfile(serviceProvider);
    });
}

function loadAccessToken(serviceProvider) {
    // Request an acces token from spotify
    let parsed = querystring.parse(window.location.search.substring(1));
    let accessToken = parsed.access_token;
    if (!accessToken) {
        // Redirect to our authentication backend.
        // This backend will redirect back to the application with an access token in the URL after a successful spotify login.
        window.location = "http://localhost:8888/login";
        // mc
        //window.location = "https://thesis-login-backend.herokuapp.com/login";
        // dd
        //window.location = "https://thesis-login-backend2.herokuapp.com/login";
    }
    serviceProvider.get(SpotifyService).configureAccessToken(accessToken);
}

function loadUserProfile(serviceProvider) {
    serviceProvider.get(SpotifyService).configureUser();
}
