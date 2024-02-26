import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStorageLocationComponent } from './modal-storage-location.component';

describe('ModalStorageLocationComponent', () => {
  let component: ModalStorageLocationComponent;
  let fixture: ComponentFixture<ModalStorageLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalStorageLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalStorageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
