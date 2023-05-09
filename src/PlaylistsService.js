const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    console.log(playlistId);
    const queryPlaylist = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const querySong = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs LEFT JOIN songs ON songs.id = playlist_songs.song_id 
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(queryPlaylist);
    const songResult = await this._pool.query(querySong);

    return {
      playlist: {
        ...playlistResult.rows[0],
        songs: songResult.rows,
      }
    }
  }
}

module.exports = PlaylistsService;
