import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RSAResultPage } from './rsa-result.page';

describe('RSAResultPage', () => {
  let component: RSAResultPage;
  let fixture: ComponentFixture<RSAResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RSAResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
