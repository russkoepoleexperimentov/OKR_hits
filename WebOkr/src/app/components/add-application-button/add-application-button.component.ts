import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewRequestDialogComponent } from '../new-request-dialog/new-request-dialog.component';

@Component({
  selector: 'app-add-application-button',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './add-application-button.component.html',
  styleUrls: ['./add-application-button.component.scss']
})
export class AddApplicationButtonComponent  {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(NewRequestDialogComponent, {
      width: '400px'
    });
  }
}
