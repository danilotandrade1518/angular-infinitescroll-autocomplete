import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInfinitescrollAutocompleteComponent } from './ngx-infinitescroll-autocomplete.component';

describe('NgxInfinitescrollAutocompleteComponent', () => {
  let component: NgxInfinitescrollAutocompleteComponent;
  let fixture: ComponentFixture<NgxInfinitescrollAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxInfinitescrollAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInfinitescrollAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
