/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AtletasComponent } from './atletas.component';

describe('AtletasComponent', () => {
  let component: AtletasComponent;
  let fixture: ComponentFixture<AtletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
