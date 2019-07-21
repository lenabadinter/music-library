import { Component, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/Material';
import { MusicLibraryService } from 'src/app/music-library.service';
import { ModifyDialogComponent } from '../dialogs/modify-dialog/modify-dialog.component';
import { Song } from 'src/app/model/song';

@Component({
  selector: 'app-add-new-song-button',
  templateUrl: './add-new-song-button.component.html',
  styleUrls: ['./add-new-song-button.component.scss']
})
export class AddNewSongButtonComponent {

  constructor(public dialog: MatDialog, private musicLibraryService: MusicLibraryService, private appRef: ApplicationRef) { }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      width: '60vw',
      data: {song: {
        name: '',
        artist: '',
        genreName: '',
        coverURL: '',
        youTubeURL: '',
        releaseDate: ''
      }, dialogTitle: 'Add New Song'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const song = new Song(null);
        song.name = result.name;
        song.artist = result.artist;
        song.genreName = result.genreName;
        song.coverURL = result.coverURL;
        song.youTubeURL = result.youTubeURL;
        song.releaseDate = result.releaseDate;
        this.musicLibraryService.addSong(song);
      }
    });
  }

}
