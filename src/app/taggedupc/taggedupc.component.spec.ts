import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedupcComponent } from './taggedupc.component';

describe('TaggedupcComponent', () => {
  let component: TaggedupcComponent;
  let fixture: ComponentFixture<TaggedupcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedupcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedupcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
