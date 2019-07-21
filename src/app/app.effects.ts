import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { LoadSongsRequested, ActionTypes, LoadSongsSucceed, AddSong } from './app.store';
import { exhaustMap, map } from 'rxjs/operators';
import { MusicLibraryService } from './music-library.service';

@Injectable()
export class AppEffects {

 loadSongsRequested$ = createEffect(() => this.actions$.pipe(
    ofType<LoadSongsRequested>(ActionTypes.LoadSongsRequested),
    exhaustMap(() => this.musicLibraryService.fetchAllSongs().pipe(
      map(result => new LoadSongsSucceed(result))
    ))
  ));

  constructor(
    private actions$: Actions,
    private musicLibraryService: MusicLibraryService
  ) {}
}

