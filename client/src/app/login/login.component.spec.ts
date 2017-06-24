import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MaterialModule} from '@angular/material';
import { LoginComponent } from './login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('LoginComponent', () => {

  let component : LoginComponent;
  let fixture :   ComponentFixture<LoginComponent>;
  let de :        DebugElement;
  let el :        HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ MaterialModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should accept username input', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain('input');
  });



});
