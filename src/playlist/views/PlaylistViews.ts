import { User, Playlist, Podcast } from '.prisma/client';

interface PlayListView extends Playlist {
  User: User;
  podcasts: Podcast[];
}

export default {
  render(playlist: PlayListView) {
    return {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      User: {
        id: playlist.User.id,
        name: playlist.User.name,
        email: playlist.User.email,
        created_at: playlist.User.created_at,
      },
      podcasts: playlist.podcasts,
    };
  },

  renderMany(playlists: PlayListView[]) {
    return playlists.map((playlist) => this.render(playlist));
  },
};
