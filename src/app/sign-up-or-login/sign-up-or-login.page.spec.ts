import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpOrLoginPage } from './sign-up-or-login.page';

describe('SignUpOrLoginPage', () => {
  let component: SignUpOrLoginPage;
  let fixture: ComponentFixture<SignUpOrLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOrLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
