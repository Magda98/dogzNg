import { TestBed } from '@angular/core/testing';

import { DogImagesService } from './dog-images.service';

describe('DogImagesService', () => {
  let service: DogImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
