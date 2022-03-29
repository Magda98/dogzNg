import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageListBreedComponent } from './image-list-breed/image-list-breed.component';
import { GalleryModule } from 'ng-gallery';
import { LIGHTBOX_CONFIG, LightboxModule  } from 'ng-gallery/lightbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FavListComponent } from './fav-list/fav-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ImagesListComponent,
    ImageListBreedComponent,
    FavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GalleryModule,
    LightboxModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
