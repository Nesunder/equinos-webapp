import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseGridComponent } from './horse-grid.component';

describe('HorseGridComponent', () => {
  let component: HorseGridComponent;
  let fixture: ComponentFixture<HorseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
