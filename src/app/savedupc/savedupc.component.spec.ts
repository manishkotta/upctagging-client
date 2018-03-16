import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedupcComponent } from './savedupc.component';

describe('SavedupcComponent', () => {
  let component: SavedupcComponent;
  let fixture: ComponentFixture<SavedupcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedupcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedupcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
