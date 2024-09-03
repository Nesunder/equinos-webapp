import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseDataComponent } from './horse-data.component';

describe('HorseDataComponent', () => {
  let component: HorseDataComponent;
  let fixture: ComponentFixture<HorseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
