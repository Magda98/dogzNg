import { Component, OnInit } from '@angular/core';
import { Gallery, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { debounceTime, fromEvent, Observable } from 'rxjs';
import { DogImagesService } from '../services/dog-images.service';

@Component({
  selector: 'app-image-list-breed',
  templateUrl: './image-list-breed.component.html',
  styleUrls: ['./image-list-breed.component.scss']
})
export class ImageListBreedComponent implements OnInit {
  dogImages: Observable<string[]>;
  dogBreeds: Observable<string[]>;
  selectedOption = "";

  constructor(private dogImagesService: DogImagesService, private gallery: Gallery, private lightbox: Lightbox) { 
    this.dogImages = this.dogImagesService.getDogBreedImages();
    this.dogBreeds = this.dogImagesService.getDogBreeds();
  }

 
  ngOnInit(): void {
    this.dogImages.subscribe((data) => {
      const items = data.map(item =>
        new ImageItem({
          src: item,
          thumb: item
        }
        ));
      this.gallery.ref().load(items);
    });
  }

  handleChange(breed: string) {
    this.dogImagesService.changeSelectedBreed(breed);
    this.dogImagesService.retriveDogBreedImages();
  }


}
