import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoryCreateComponent } from './post-category-create.component';

describe('PostCategoryCreateComponent', () => {
  let component: PostCategoryCreateComponent;
  let fixture: ComponentFixture<PostCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCategoryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
