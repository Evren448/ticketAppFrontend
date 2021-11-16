import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesModalComponent } from './vehicles-modal.component';

describe('VehiclesModalComponent', () => {
  let component: VehiclesModalComponent;
  let fixture: ComponentFixture<VehiclesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
