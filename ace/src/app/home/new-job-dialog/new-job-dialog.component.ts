import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-job-dialog',
  templateUrl: './new-job-dialog.component.html',
  styleUrls: ['./new-job-dialog.component.scss'],
})
export class NewJobDialogComponent implements OnInit {
  public date: Date;
  public jobForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewJobDialogComponent>,
    public formBuilder: FormBuilder) {

    this.date = new Date();
  }

  public ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      address: ['', Validators.required],
      payment: ['', Validators.pattern('^[0-9]*[.,]?[0-9]+$')],
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): boolean {
    if (this.jobForm.invalid) {
      return false;
    }

    alert(`SUCCESS!! :-)\n\n ${JSON.stringify(this.jobForm.value)}`);
    this.dialogRef.close();
  }
}
