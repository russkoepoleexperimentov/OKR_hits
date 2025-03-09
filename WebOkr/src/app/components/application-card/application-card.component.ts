import { Component } from '@angular/core';
import { ApplicationDetailsDialogComponent } from '../application-details-dialog/application-details-dialog.component';
import { Input } from '@angular/core';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-application-card',
  imports: [ApplicationDetailsDialogComponent],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.scss'
})
export class ApplicationCardComponent {
  @Input() request: any;
  private dialogRef: MatDialogRef<ApplicationDetailsDialogComponent> | null = null;


  constructor(public dialog: MatDialog) { }
  openDetails(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(ApplicationDetailsDialogComponent, {
      width: '1000px',
      height: 'fit-content',
      data: this.request
    });
  }
}
