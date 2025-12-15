import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessageDialogComponent } from './admin-message-dialog.component';

describe('AdminMessageDialogComponent', () => {
  let component: AdminMessageDialogComponent;
  let fixture: ComponentFixture<AdminMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMessageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
