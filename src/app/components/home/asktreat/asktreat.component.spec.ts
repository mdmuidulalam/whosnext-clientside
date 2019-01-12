import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsktreatComponent } from './asktreat.component';

describe('AsktreatComponent', () => {
  let component: AsktreatComponent;
  let fixture: ComponentFixture<AsktreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsktreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsktreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
