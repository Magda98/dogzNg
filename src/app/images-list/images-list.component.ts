import { DogImagesService } from './../services/dog-images.service';
import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, fromEvent, Observable } from 'rxjs';
import { IAlbum, Lightbox } from 'ngx-lightbox';



@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {
  dogImages: Observable<string[]>
  private _album: IAlbum[];
  onScroll$ = fromEvent(window, "scroll").pipe(debounceTime(200));

  constructor(private dogImagesService: DogImagesService, private _lightbox: Lightbox) { 
    this.dogImages = this.dogImagesService.getDogImages();
    this._album = [];
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
    this.dogImages.subscribe((images) => {
      this._album = images.map(src =>
        ({ src, thumb: src })
      )
    });

    this.onScroll$.subscribe(() => {
      this.getDogzOnScroll();
    })
  }

  openImage(index: number) {
    this._lightbox.open(this._album, index);
    console.log(index)
  }

}
