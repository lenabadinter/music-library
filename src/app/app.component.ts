import { Component, OnInit } from '@angular/core';
import { MusicLibraryService } from './music-library.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private loading = true;
  constructor(private musicLibraryService: MusicLibraryService) { }

  ngOnInit() {
    this.musicLibraryService.getAllSongsLoaded().subscribe(allSongsLoaded => {
      this.loading = !allSongsLoaded;
    });
    this.musicLibraryService.requestSongsLoad();
  }

}
