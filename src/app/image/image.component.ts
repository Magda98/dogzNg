import { DogImagesService } from './../services/dog-images.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  fav = false;
  @Input() url!: string;
  @Input() index!: number;

  constructor(private dogService: DogImagesService) { }

  ngOnInit(): void {
    this.fav = this.dogService.checkIfFav(this.url);
  }

  addToFav(e: MouseEvent) {
    e.stopPropagation();

    this.dogService.addFavImage(this.url);
    this.fav = this.dogService.checkIfFav(this.url);
  }

  removeFromFav(e: MouseEvent) {
    e.stopPropagation();
    
    this.dogService.removeFavImage(this.url);
    this.fav = this.dogService.checkIfFav(this.url);
  }
}
