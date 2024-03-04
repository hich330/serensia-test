import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailWebCrawlerComponent } from './mail-web-crawler.component';

describe('MailWebCrawlerComponent', () => {
  let component: MailWebCrawlerComponent;
  let fixture: ComponentFixture<MailWebCrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailWebCrawlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MailWebCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
