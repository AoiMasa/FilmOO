import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRateStatComponent } from './movie-rate-stat.component';

describe('MovieRateStatComponent', () => {
  let component: MovieRateStatComponent;
  let fixture: ComponentFixture<MovieRateStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRateStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRateStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
