import { Component, Input } from '@angular/core';
import { Song } from 'src/app/model/song';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ModifyDialogComponent } from '../dialogs/modify-dialog/modify-dialog.component';
import { MusicLibraryService } from 'src/app/music-library.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})

export class SongComponent {
  @Input() song: Song;
  constructor(public dialog: MatDialog, private musicLibraryService: MusicLibraryService) { }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '60vw',
      data: {song: {
        name: this.song.name,
        id: this.song.id,
      }}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.toDelete) {
        this.musicLibraryService.deleteSong(this.song.id);
      }
    });
  }

  openModifyDialog(): void {
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      width: '60vw',
      data: {song: {
        name: this.song.name,
        artist: this.song.artist,
        genreName: this.song.genreName,
        coverURL: this.song.coverURL,
        youTubeURL: this.song.youTubeURL,
        releaseDate: this.song.releaseDate
      }, dialogTitle: 'Update Song'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.song.name = result.name;
        this.song.artist = result.artist;
        this.song.genreName = result.genreName;
        this.song.coverURL = result.coverURL;
        this.song.youTubeURL = result.youTubeURL;
        this.song.releaseDate = result.releaseDate;
        this.musicLibraryService.updateSong(this.song);
      }
    });
  }
}
