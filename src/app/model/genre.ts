import { songGenre } from './song';

export class Genre {
    genreName: songGenre;
    selected: boolean;

    constructor(genreName: songGenre, selected: boolean) {
      this.genreName = genreName;
      this.selected = selected;
    }
  }
