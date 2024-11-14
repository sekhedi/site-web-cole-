import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCoursesComponent } from './tab-courses.component';

describe('TabCoursesComponent', () => {
  let component: TabCoursesComponent;
  let fixture: ComponentFixture<TabCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
