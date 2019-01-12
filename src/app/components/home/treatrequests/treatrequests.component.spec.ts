import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatrequestsComponent } from './treatrequests.component';

describe('TreatrequestsComponent', () => {
  let component: TreatrequestsComponent;
  let fixture: ComponentFixture<TreatrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
