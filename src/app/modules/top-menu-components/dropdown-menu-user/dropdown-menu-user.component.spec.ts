import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuUserComponent } from './dropdown-menu-user.component';

describe('DropdownMenuUserComponent', () => {
  let component: DropdownMenuUserComponent;
  let fixture: ComponentFixture<DropdownMenuUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
