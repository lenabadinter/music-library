import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/Material';
import { Song } from 'src/app/model/song';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Song) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogRef.close(
      {
        toDelete: true
      }
    );
  }
}
