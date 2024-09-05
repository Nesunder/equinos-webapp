import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseSelectorComponent } from './horse-selector.component';

describe('HorseSelectorComponent', () => {
  let component: HorseSelectorComponent;
  let fixture: ComponentFixture<HorseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
