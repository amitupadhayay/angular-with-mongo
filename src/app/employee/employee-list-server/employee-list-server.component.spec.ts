import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StubServiceService } from 'common/stub-services/stub-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';

import { EmployeeListServerComponent } from './employee-list-server.component';

describe('EmployeeListServerComponent', () => {
  let component: EmployeeListServerComponent;
  let fixture: ComponentFixture<EmployeeListServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListServerComponent ],
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
    fixture = TestBed.createComponent(EmployeeListServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
