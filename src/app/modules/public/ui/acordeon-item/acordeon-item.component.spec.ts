import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordeonItemComponent } from './acordeon-item.component';

describe('AcordeonItemComponent', () => {
  let component: AcordeonItemComponent;
  let fixture: ComponentFixture<AcordeonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcordeonItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcordeonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
