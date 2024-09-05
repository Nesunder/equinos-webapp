import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseSelectorDialogComponent } from './horse-selector-dialog.component';

describe('HorseSelectorDialogComponent', () => {
  let component: HorseSelectorDialogComponent;
  let fixture: ComponentFixture<HorseSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseSelectorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorseSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
