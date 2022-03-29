import { Component, OnInit } from '@angular/core';
import { Gallery, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable } from 'rxjs';
import { DogImagesService } from '../services/dog-images.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {
  dogImages: Observable<string[]>

  constructor(private dogImagesService: DogImagesService, private gallery: Gallery, private lightbox: Lightbox) {
    this.dogImages = this.dogImagesService.getFavImages();

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

}
