import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalTicketComponent } from './user-modal-ticket.component';

describe('UserModalTicketComponent', () => {
  let component: UserModalTicketComponent;
  let fixture: ComponentFixture<UserModalTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModalTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
