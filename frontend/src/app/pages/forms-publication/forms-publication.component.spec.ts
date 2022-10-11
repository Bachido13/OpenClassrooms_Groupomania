import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPublicationComponent } from './forms-publication.component';

describe('FormsPublicationComponent', () => {
  let component: FormsPublicationComponent;
  let fixture: ComponentFixture<FormsPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsPublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
