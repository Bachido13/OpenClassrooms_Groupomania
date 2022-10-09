import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationComponent } from './single-publication.component';

describe('PublicationComponent', () => {
  let component: PublicationComponent;
  let fixture: ComponentFixture<PublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
