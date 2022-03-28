import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListBreedComponent } from './image-list-breed.component';

describe('ImageListBreedComponent', () => {
  let component: ImageListBreedComponent;
  let fixture: ComponentFixture<ImageListBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageListBreedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
