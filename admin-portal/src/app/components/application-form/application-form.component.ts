import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationService, Application } from '../../services/application.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  application?: Application;
  readOnly = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ApplicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.application = data?.application;
    this.readOnly = data?.readOnly || false;
    this.isEditMode = !!this.application;
  }

  ngOnInit() {
    this.applicationForm = this.fb.group({
      name: [
        { 
          value: this.application?.name || '', 
          disabled: this.readOnly 
        }, 
        Validators.required
      ],
      domain: [
        { 
          value: this.application?.domain || '', 
          disabled: this.readOnly 
        }, 
        Validators.required
      ],
      description: [
        { 
          value: this.application?.description || '', 
          disabled: this.readOnly 
        }, 
        Validators.required
      ],
      status: [
        {
          value: this.application?.status || 'active',
          disabled: this.readOnly
        }
      ]
    });
  }

  onSubmit() {
    if (this.applicationForm.invalid) return;

    const formData = this.applicationForm.getRawValue();

    if (this.isEditMode) {
      this.updateApplication(formData);
    } else {
      this.createApplication(formData);
    }
  }

  createApplication(applicationData: Partial<Application>) {
    this.applicationService.createApplication(applicationData as Application)
      .subscribe(
        (newApplication) => {
          this.snackBar.open('Application registered successfully', 'Close', {
            duration: 3000
          });
          this.dialogRef.close(newApplication);
        },
        (error) => {
          this.snackBar.open('Failed to register application', 'Close', {
            duration: 3000
          });
        }
      );
  }

  updateApplication(applicationData: Partial<Application>) {
    if (!this.application?._id) return;

    const updatedData = {
      ...this.application,
      ...applicationData,
      status: applicationData.status || this.application.status
    };

    this.applicationService.updateApplication(this.application._id, updatedData)
      .subscribe(
        (updatedApplication) => {
          this.snackBar.open('Application updated successfully', 'Close', {
            duration: 3000
          });
          this.dialogRef.close(updatedApplication);
        },
        (error) => {
          this.snackBar.open('Failed to update application', 'Close', {
            duration: 3000
          });
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }

  copyApiKey() {
    if (this.application?.apiKey) {
      navigator.clipboard.writeText(this.application.apiKey).then(() => {
        this.snackBar.open('API Key copied to clipboard', 'Close', {
          duration: 2000
        });
      });
    }
  }
}
