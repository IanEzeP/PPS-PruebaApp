import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementPage } from './movement.page';

describe('MovementPage', () => {
  let component: MovementPage;
  let fixture: ComponentFixture<MovementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
