import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPieComponent } from './angular-pie.component';

describe('AngularPieComponent', () => {
  let component: AngularPieComponent;
  let fixture: ComponentFixture<AngularPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
