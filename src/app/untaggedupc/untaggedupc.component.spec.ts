import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UntaggedupcComponent } from './untaggedupc.component';

describe('UntaggedupcComponent', () => {
  let component: UntaggedupcComponent;
  let fixture: ComponentFixture<UntaggedupcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UntaggedupcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UntaggedupcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
