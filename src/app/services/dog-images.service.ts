import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

interface ApiResponse {
  message: string[],
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class DogImagesService {
  dogImages = new BehaviorSubject<string[]>([]);


  constructor(private http: HttpClient) {
    this.retriveDogImages()
  }
  
  getDogImages() {
    return this.dogImages.asObservable();
  }

  retriveDogImages() {
    this.http.get<ApiResponse>("https://dog.ceo/api/breeds/image/random/18").subscribe(response => {
      this.dogImages.next(this.dogImages.getValue().concat(response.message));
    })
  }

}
