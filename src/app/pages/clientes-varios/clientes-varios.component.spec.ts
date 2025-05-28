import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesVariosComponent } from './clientes-varios.component';

describe('ClientesVariosComponent', () => {
  let component: ClientesVariosComponent;
  let fixture: ComponentFixture<ClientesVariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesVariosComponent]
    });
    fixture = TestBed.createComponent(ClientesVariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
