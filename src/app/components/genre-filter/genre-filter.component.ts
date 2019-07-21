import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/model/genre';
import { MusicLibraryService } from 'src/app/music-library.service';
import { MatCheckboxChange } from '@angular/Material';
import { songGenre } from 'src/app/model/song';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent implements OnInit {
  genres$: Observable<Genre[]>;
  constructor(private musicLibraryService: MusicLibraryService) { }

  toggleGenreSelection($event: MatCheckboxChange, selected: boolean, genreName: songGenre) {
    this.musicLibraryService.toggleGenreSelection(selected, genreName);
  }

  ngOnInit() {
    this.genres$ = this.musicLibraryService.getAllGenres();
  }

}
