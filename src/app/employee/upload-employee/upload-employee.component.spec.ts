import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrManager } from 'ng6-toastr-notifications';

import { UploadEmployeeComponent } from './upload-employee.component';

describe('UploadEmployeeComponent', () => {
  let component: UploadEmployeeComponent;
  let fixture: ComponentFixture<UploadEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadEmployeeComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        //ToastrManager,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
