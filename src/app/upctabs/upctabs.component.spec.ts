import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpctabsComponent } from './upctabs.component';

describe('UpctabsComponent', () => {
  let component: UpctabsComponent;
  let fixture: ComponentFixture<UpctabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpctabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpctabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
