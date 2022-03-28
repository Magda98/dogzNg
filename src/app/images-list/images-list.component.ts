import { DogImagesService } from './../services/dog-images.service';
import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, fromEvent, Observable } from 'rxjs';
import { Lightbox } from 'ng-gallery/lightbox';
import { Gallery, ImageItem } from 'ng-gallery';



@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {
  dogImages: Observable<string[]>
  onScroll$ = fromEvent(window, "scroll").pipe(debounceTime(200));
  


  constructor(private dogImagesService: DogImagesService, private gallery: Gallery, private lightbox: Lightbox) { 
    this.dogImages = this.dogImagesService.getDogImages();
  }

  getDogzOnScroll = () => {
    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow) {
      this.dogImagesService.retriveDogImages();
    }
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

    this.onScroll$.subscribe(() => {
      this.getDogzOnScroll();
    });
  }

}
