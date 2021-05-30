import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StubServiceService } from 'common/stub-services/stub-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';

import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EmployeeFormComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        //ToastrManager,
      ],
      providers: [
        { provide: ToastrManager, useClass: StubServiceService, },
        { provide: MatDialog, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
