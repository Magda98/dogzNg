import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

interface ApiResponseImages {
  message: string[],
  status: string
}

interface ApiResponseBreeds{
  message: Record<string, string[]>
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class DogImagesService {
  dogImages = new BehaviorSubject<string[]>([]);
  dogBreeds = new BehaviorSubject<string[]>([]);
  dogBreedImages = new BehaviorSubject<string[]>([]);
  dogFavImages = new BehaviorSubject<string[]>([]);
  selectedBreed = new BehaviorSubject<string>("");

  baseUrl = "https://dog.ceo/api/";


  constructor(private http: HttpClient, private storage: StorageService) {
    this.retriveDogImages();
    this.retriveDogBreeds();
    this.getFavImagesStorage();
    this.selectedBreed.subscribe(() => this.dogBreedImages.next([]));
  }

  addFavImage(url: string) {
    this.dogFavImages.next(this.dogFavImages.getValue().concat(url));
    this.setFavItemsStorage();
  }

  removeFavImage(url: string) {
    const temp = this.dogFavImages.getValue().filter((item) => item !== url);
    this.dogFavImages.next(temp);
    this.setFavItemsStorage();
  }

  checkIfFav(url: string) {
    const check = this.dogFavImages.getValue().find(item => item === url) ? true : false;
    return check;
  }
  
  getFavImagesStorage() {
    this.dogFavImages.next(this.storage.getData("fav"));
  }

  setFavItemsStorage() {
    this.storage.setData("fav", this.dogFavImages.getValue());
  }

  getFavImages() {
    return this.dogFavImages.asObservable();
  }

  getDogImages() {
    return this.dogImages.asObservable();
  }

  getDogBreeds() {
    return this.dogBreeds.asObservable();
  }

  getDogBreedImages() {
    return this.dogBreedImages.asObservable();
  }

  retriveDogImages() {
    this.http.get<ApiResponseImages>(`${this.baseUrl}breeds/image/random/18`).subscribe(response => {
      this.dogImages.next(this.dogImages.getValue().concat(response.message));
    })
  }

  retriveDogBreeds() {
    this.http.get<ApiResponseBreeds>(`${this.baseUrl}breeds/list/all`).subscribe(response => {
      this.dogBreeds.next(Object.keys(response.message));
    })
  }

  changeSelectedBreed(breed: string) {
    this.selectedBreed.next(breed);
  }

  retriveDogBreedImages() {
    this.http.get<ApiResponseImages>(`${this.baseUrl}breed/${this.selectedBreed.getValue()}/images`).subscribe(response => {
      this.dogBreedImages.next(this.dogBreedImages.getValue().concat(response.message));
    })
  }

}
