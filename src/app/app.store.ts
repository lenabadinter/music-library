import { Action, createSelector,
  createFeatureSelector } from '@ngrx/store';
import { Song, songGenre } from './model/song';
import { Genre } from './model/genre';

export interface SongsState {
  allSongsLoaded: boolean;
  songsData: Song[] | null;
  genresData: Genre[] | null;
}

export interface AppState {
  songs: SongsState;
}

const intialState = {
  allSongsLoaded: false,
  songsData: null,
  genresData: null,
};

export enum ActionTypes {
  LoadSongsRequested = '[Music Library API] Load Songs Requested',
  LoadSongsSucceed = '[Music Library API] Load Songs Succeed',
  ToggleGenreSelection = '[Music Library API] Toggle Genre Selection',
  UpdateSong = '[Music Library API] Update Song',
  AddSong = '[Music Library API] Add Song',
  DeleteSong = '[Music Library API] Delete Song',
}

export class LoadSongsRequested implements Action {
  readonly type = ActionTypes.LoadSongsRequested;
}

export class LoadSongsSucceed implements Action {
  readonly type = ActionTypes.LoadSongsSucceed;
  constructor(public payload: any) {}
}

export class ToggleGenreSelection implements Action {
  readonly type = ActionTypes.ToggleGenreSelection;
  constructor(public payload: {selected: boolean, genreName: songGenre}) {}
}

export class UpdateSong implements Action {
  readonly type = ActionTypes.UpdateSong;
  constructor(public payload: {song: Song}) {}
}

export class AddSong implements Action {
  readonly type = ActionTypes.AddSong;
  constructor(public payload: {song: Song}) {}
}

export class DeleteSong implements Action {
  readonly type = ActionTypes.DeleteSong;
  constructor(public payload: {id: string}) {}
}

export type LibraryActions = LoadSongsRequested | LoadSongsSucceed | ToggleGenreSelection | UpdateSong | AddSong | DeleteSong;

export function songsReducer(state = intialState, action: { type: any; payload: any }) {
  switch (action.type) {
    case ActionTypes.LoadSongsSucceed:
      return {
        allSongsLoaded: true,
        songsData: action.payload.songs ?  action.payload.songs.map(song => new Song(song)) : action.payload.songs,
        genresData: action.payload.genres ?  action.payload.genres.map(genre => new Genre(genre, true)) : action.payload.genres
      };
    case ActionTypes.ToggleGenreSelection:
      const genreData: Genre = state.genresData.filter((genre: Genre) => genre.genreName === action.payload.genreName);
      genreData.selected = action.payload.selected;

      state.songsData.forEach(song => {
        if (song.genreName === action.payload.genreName) {
          song.visible = action.payload.selected;
        }
      });
      return state;

      case ActionTypes.UpdateSong:
          let songData: Song = state.songsData.filter((song: Song) => song.id === action.payload.song.id);
          songData = new Song(action.payload.song);
          return state;

      case ActionTypes.AddSong:
          state.songsData.unshift(action.payload.song);

          return {
            allSongsLoaded: true,
            songsData: [...state.songsData],
            genresData: state.genresData
          };

      case ActionTypes.DeleteSong:
          return {
            allSongsLoaded: true,
            songsData: state.songsData.filter((song: Song) => song.id !== action.payload.id),
            genresData: state.genresData
          };

    default:
      return state;
  }
}

const getSongs = createFeatureSelector<AppState, SongsState>('songs');
export const getAllSongs = createSelector(getSongs, state => state.songsData);
export const getAllGenres = createSelector(getSongs, state => state.genresData);
export const getAllSongsLoaded = createSelector(getSongs, state => state.allSongsLoaded);

export const getSelectedGenres = createSelector(
  getAllGenres,
  (genresData: Genre[]) => {
    if (genresData) {
      return genresData.filter((genre: Genre) => genre.selected === true);
    }
    return genresData;
  }
);

export const getSongsInSelectedGenres = createSelector(
  getSelectedGenres,
  getAllSongs,
  (selectedGenres: Genre[], songsData: Song[]) => {
    if (selectedGenres && songsData) {
      return songsData.filter((song: Song) => selectedGenres.some(({ genreName }) => genreName === song.genreName));
    } else {
      return songsData;
    }
  }
);


