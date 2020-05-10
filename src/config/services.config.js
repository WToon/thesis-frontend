import { SpotifyService } from '../services/spotify-service';

export function configServices(serviceProvider) {
  const spotifyService = new SpotifyService();

  serviceProvider.register(spotifyService);
}