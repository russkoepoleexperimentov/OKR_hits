import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-request-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule
  ],
  templateUrl: './new-request-dialog.component.html',
  styleUrl: './new-request-dialog.component.scss'
})
export class NewRequestDialogComponent {
  description: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private dialogRef: MatDialogRef<NewRequestDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log('Создана заявка:', { description: this.description, startDate: this.startDate, endDate: this.endDate });
    this.dialogRef.close();
  }
}
