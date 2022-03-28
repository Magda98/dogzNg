import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

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
  selectedBreed = new BehaviorSubject<string>("");

  baseUrl = "https://dog.ceo/api/";


  constructor(private http: HttpClient) {
    this.retriveDogImages();
    this.retriveDogBreeds();
    this.selectedBreed.subscribe(() => this.dogBreedImages.next([]))
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
