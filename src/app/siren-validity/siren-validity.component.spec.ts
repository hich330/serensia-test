import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SirenValidityComponent } from './siren-validity.component';

describe('SirenValidityComponent', () => {
  let component: SirenValidityComponent;
  let fixture: ComponentFixture<SirenValidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SirenValidityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SirenValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
