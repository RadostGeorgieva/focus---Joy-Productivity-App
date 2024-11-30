import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerMoodComponent } from './flower-mood.component';

describe('FlowerMoodComponent', () => {
  let component: FlowerMoodComponent;
  let fixture: ComponentFixture<FlowerMoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerMoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
