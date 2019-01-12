import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreathistoryComponent } from './treathistory.component';

describe('TreathistoryComponent', () => {
  let component: TreathistoryComponent;
  let fixture: ComponentFixture<TreathistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreathistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreathistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
