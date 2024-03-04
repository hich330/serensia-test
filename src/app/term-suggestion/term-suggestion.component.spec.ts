import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermSuggestionComponent } from './term-suggestion.component';

describe('TermSuggestionComponent', () => {
  let component: TermSuggestionComponent;
  let fixture: ComponentFixture<TermSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermSuggestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
