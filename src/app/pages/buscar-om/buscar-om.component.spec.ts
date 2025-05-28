import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOmComponent } from './buscar-om.component';

describe('BuscarOmComponent', () => {
  let component: BuscarOmComponent;
  let fixture: ComponentFixture<BuscarOmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarOmComponent]
    });
    fixture = TestBed.createComponent(BuscarOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
