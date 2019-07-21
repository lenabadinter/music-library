import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/model/song';
import { MusicLibraryService } from 'src/app/music-library.service';
import { withLatestFrom, map } from 'rxjs/operators';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {
  songs$: Observable<Song[]>;

  constructor(private musicLibraryService: MusicLibraryService) {
    this.songs$ = this.musicLibraryService.getSongsInSelectedGenres();
   }
}
