import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateMainButtonComponent } from './navigate-main-button.component';

describe('NavigateMainButtonComponent', () => {
  let component: NavigateMainButtonComponent;
  let fixture: ComponentFixture<NavigateMainButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateMainButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateMainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
