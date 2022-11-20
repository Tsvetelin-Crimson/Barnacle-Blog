import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCatalogComponent } from './posts-catalog.component';

describe('PostsCatalogComponent', () => {
  let component: PostsCatalogComponent;
  let fixture: ComponentFixture<PostsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
