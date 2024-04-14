import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DominiosComponent } from './dominios.component';

describe('DominiosComponent', () => {
  let component: DominiosComponent;
  let fixture: ComponentFixture<DominiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DominiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DominiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
