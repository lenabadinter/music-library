import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/Material';
import { Song } from 'src/app/model/song';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.scss']
})
export class ModifyDialogComponent {
  options: FormGroup;
  releaseDate: FormControl;
  releaseDateValue: string;
  name = new FormControl('', [Validators.required]);
  artist = new FormControl('', [Validators.required]);
  genreName = new FormControl('', [Validators.required]);
  coverURL = new FormControl('', [Validators.required]);
  youTubeURL = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ModifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { song: Song, dialogTitle: string }, fb: FormBuilder) {
      this.options = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
      });
      const date = this.data.song.releaseDate ? new Date(this.data.song.releaseDate) : new Date();
      this.releaseDateValue = this.getDateInFormat(date);
      this.releaseDate = new FormControl(date, [Validators.required]);
    }

    hasError() {
      if ((this.name.hasError('required'))
      || (this.artist.hasError('required'))
      || (this.genreName.hasError('required'))
      || (this.coverURL.hasError('required'))
      || (this.youTubeURL.hasError('required'))
      || (this.releaseDate.hasError('required'))
      ) {
        return true;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDateInFormat(date: Date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (!date) {
      date = new Date();
    }
    return months[date.getMonth()] + ' '
        +  date.getDate() + ', '
        + date.getFullYear();
  }

  onDateChange(event) {
    this.releaseDateValue = this.getDateInFormat(event.value);
  }

  save($event: MouseEvent): void {
    if (this.hasError()) {
      $event.preventDefault();
      return;
    }

    this.dialogRef.close(
      {
        name: this.data.song.name,
        artist: this.data.song.artist,
        genreName: this.data.song.genreName,
        coverURL: this.data.song.coverURL,
        youTubeURL: this.data.song.youTubeURL,
        releaseDate: this.releaseDateValue
      }
    );
  }
}
