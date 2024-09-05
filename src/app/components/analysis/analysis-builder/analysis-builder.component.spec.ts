import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBuilderComponent } from './analysis-builder.component';

describe('AnalysisBuilderComponent', () => {
  let component: AnalysisBuilderComponent;
  let fixture: ComponentFixture<AnalysisBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
