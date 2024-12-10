import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService, Application } from '../../services/application.service';
import { ApplicationFormComponent } from '../application-form/application-form.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  displayedColumns: string[] = [
    'name', 
    'domain', 
    'status', 
    'requestCount', 
    'actions'
  ];
  
  dataSource = new MatTableDataSource<Application>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private applicationService: ApplicationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(
      (applications: Application[]) => {
        this.dataSource = new MatTableDataSource(applications);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.snackBar.open('Failed to load applications', 'Close', {
          duration: 3000
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openApplicationForm() {
    const dialogRef = this.dialog.open(ApplicationFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadApplications();
      }
    });
  }

  viewApplicationDetails(application: Application) {
    const dialogRef = this.dialog.open(ApplicationFormComponent, {
      width: '500px',
      data: { 
        application, 
        readOnly: true 
      }
    });
  }

  editApplication(application: Application) {
    const dialogRef = this.dialog.open(ApplicationFormComponent, {
      width: '500px',
      data: { application }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadApplications();
      }
    });
  }

  deleteApplication(application: Application) {
    const confirmDelete = confirm(`Are you sure you want to delete ${application.name}?`);
    
    if (confirmDelete) {
      this.applicationService.deleteApplication(application._id!).subscribe(
        () => {
          this.snackBar.open('Application deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadApplications();
        },
        error => {
          this.snackBar.open('Failed to delete application', 'Close', {
            duration: 3000
          });
        }
      );
    }
  }

  updateStatus(application: Application, isActive: boolean) {
    const updatedApplication = {
      ...application,
      status: isActive ? 'active' : 'inactive'
    };

    this.applicationService.updateApplication(application._id!, updatedApplication)
      .subscribe(
        (updated) => {
          this.snackBar.open('Application status updated successfully', 'Close', {
            duration: 3000
          });
          this.loadApplications();
        },
        (error) => {
          this.snackBar.open('Failed to update application status', 'Close', {
            duration: 3000
          });
          // Revert the toggle if update fails
          application.status = application.status === 'active' ? 'inactive' : 'active';
        }
      );
  }
}
