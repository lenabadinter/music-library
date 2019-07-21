import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { MusicLibraryService } from './music-library.service';
import { HttpClientModule } from '@angular/common/http';
import { songsReducer } from './app.store';
import { SongListComponent } from './components/song-list/song-list.component';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { SongComponent } from './components/song/song.component';
import { GenreFilterComponent } from './components/genre-filter/genre-filter.component';
import { MatNativeDateModule } from '@angular/Material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ModifyDialogComponent } from './components/dialogs/modify-dialog/modify-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { AddNewSongButtonComponent } from './components/add-new-song-button/add-new-song-button.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ songs: songsReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteDialogComponent, ModifyDialogComponent],
  declarations: [ AppComponent, SongListComponent, LoaderComponent, SongComponent,
    GenreFilterComponent, DeleteDialogComponent,
    DeleteDialogComponent,
    ModifyDialogComponent,
    AddNewSongButtonComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    AppEffects,
    MusicLibraryService
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
