import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOfComponent } from './buscar-of.component';

describe('BuscarOfComponent', () => {
  let component: BuscarOfComponent;
  let fixture: ComponentFixture<BuscarOfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarOfComponent]
    });
    fixture = TestBed.createComponent(BuscarOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
