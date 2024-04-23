import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndicatorComponent } from './form-indicator.component';

describe('FormIndicatorComponent', () => {
  let component: FormIndicatorComponent;
  let fixture: ComponentFixture<FormIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
