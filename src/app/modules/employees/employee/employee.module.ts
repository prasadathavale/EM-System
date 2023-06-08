import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from '../../../components/employee/employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../../components/add-employee/add-employee.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatConfirmDialogComponent } from '../../../components/mat-confirm-dialog/mat-confirm-dialog.component';



@NgModule({
  declarations: [
    EmployeeComponent,
    AddEmployeeComponent,
    MatConfirmDialogComponent
  ],
  entryComponents:[AddEmployeeComponent,MatConfirmDialogComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ]
})
export class EmployeeModule { }
