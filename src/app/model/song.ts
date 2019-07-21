export type songGenre = 'pop' | 'rap' | 'hip-hop' | 'alternative' | 'rock';
export class Song {
  id: string;
  name: string;
  artist: string;
  genreName: songGenre;
  coverURL: string;
  youTubeURL: string;
  releaseDate: string;
  visible: boolean;

  constructor(song: Song = null) {
    this.id = song ? song.id : new Date().getMilliseconds().toString();
    this.name = song ? song.name : '';
    this.artist = song ? song.artist : '';
    this.genreName = song ? song.genreName : 'pop';
    this.coverURL = song ? song.coverURL : '';
    this.youTubeURL = song ? song.youTubeURL : '';
    this.releaseDate = song ? song.releaseDate : new Date().toString();
    this.visible = song && typeof song.visible !== 'undefined' ? song.visible : true;
  }
}
