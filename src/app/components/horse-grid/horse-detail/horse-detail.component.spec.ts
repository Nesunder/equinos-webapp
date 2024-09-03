import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseDetailComponent } from './horse-detail.component';

describe('HorseDetailComponent', () => {
  let component: HorseDetailComponent;
  let fixture: ComponentFixture<HorseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
