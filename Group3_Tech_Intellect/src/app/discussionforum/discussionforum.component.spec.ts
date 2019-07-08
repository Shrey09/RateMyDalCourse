import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionforumComponent } from './discussionforum.component';

describe('DiscussionforumComponent', () => {
  let component: DiscussionforumComponent;
  let fixture: ComponentFixture<DiscussionforumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionforumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
