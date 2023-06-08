import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'address', 'city', 'mobile', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private snackBarService: SnackbarService
  ) { }

  openDialog() {
    this.dialog.open(AddEmployeeComponent, {
      width: '30%',
      disableClose: true
      // height:'50%'
    }).afterClosed().subscribe(val => {
      // if(val==='save'){
      //   this.getAllEmployee();
      // }
      this.getAllEmployee();
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);

    // });
  }
  // public closeDialog(): void {
  //   this.dialog.close();

  // }


  ngOnInit(): void {
    this.getAllEmployee();
  }

  //Get all employee
  getAllEmployee() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(res);
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }

  //Edit employee by it's row value
  editEmployee(row: any) {
    this.dialog.open(AddEmployeeComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(res => {
      if (res === 'update') {
        this.getAllEmployee();
      }
    })
  }

  //Mat dialog pop-up for delete
  onDeleteEmployeeById(id: number) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '20%',
      data: { message: 'Are you sure you want to delete record?' }
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.deleteEmployeeById(id);
      }
    })
  }

  //Delete employee by id
  deleteEmployeeById(id: number) {
    // if(confirm('Are you confirm to delete'))
    this.api.deleteEmployee(id).subscribe({
      next: (res) => {
        this.getAllEmployee();

        this.snackBarService.open('employee deleted successfully!!')
        // alert("Record has been deleted successfully");
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }

  //Apply filter method on table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
