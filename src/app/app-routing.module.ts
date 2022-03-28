import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageListBreedComponent } from './image-list-breed/image-list-breed.component';

const routes: Routes = [
  { path: '', component: ImagesListComponent },
  { path: 'breed', component: ImageListBreedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
