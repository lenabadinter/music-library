import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song, songGenre } from './model/song';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, getAllSongsLoaded, LoadSongsRequested, getAllGenres,
  getSongsInSelectedGenres, ToggleGenreSelection, UpdateSong, AddSong, DeleteSong } from './app.store';
import { Genre } from './model/genre';

@Injectable({
  providedIn: 'root'
})

export class MusicLibraryService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  fetchAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>('./assets/music-library.json').pipe(
      retry(10)
    );
  }

  requestSongsLoad() {
    this.store.dispatch(new LoadSongsRequested());
  }

  getSongsInSelectedGenres(): Observable<Song[]> {
    return this.store.select(getSongsInSelectedGenres);
  }

  getAllSongsLoaded(): Observable<boolean> {
    return this.store.select(getAllSongsLoaded);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.store.select(getAllGenres);
  }

  toggleGenreSelection(selected: boolean, genreName: songGenre) {
    this.store.dispatch(new ToggleGenreSelection({ selected, genreName }));
  }

  updateSong(song: Song) {
    this.store.dispatch(new UpdateSong({ song }));
  }

  addSong(song: Song) {
    this.store.dispatch(new AddSong({ song }));
  }

  deleteSong(id: string) {
    this.store.dispatch(new DeleteSong({ id }));
  }
}
