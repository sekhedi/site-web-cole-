import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcontactComponent } from './tabcontact.component';

describe('TabcontactComponent', () => {
  let component: TabcontactComponent;
  let fixture: ComponentFixture<TabcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
