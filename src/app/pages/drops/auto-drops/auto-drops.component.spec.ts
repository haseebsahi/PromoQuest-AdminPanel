import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDropsComponent } from './auto-drops.component';

describe('AutoDropsComponent', () => {
  let component: AutoDropsComponent;
  let fixture: ComponentFixture<AutoDropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoDropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
