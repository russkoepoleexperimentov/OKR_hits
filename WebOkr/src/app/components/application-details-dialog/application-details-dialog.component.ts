import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-application-details-dialog',
  imports: [],
  templateUrl: './application-details-dialog.component.html',
  styleUrl: './application-details-dialog.component.scss'
})
export class ApplicationDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApplicationDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}

