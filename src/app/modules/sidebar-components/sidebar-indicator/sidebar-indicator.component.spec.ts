import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarIndicatorComponent } from './sidebar-indicator.component';

describe('SidebarIndicatorComponent', () => {
  let component: SidebarIndicatorComponent;
  let fixture: ComponentFixture<SidebarIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
