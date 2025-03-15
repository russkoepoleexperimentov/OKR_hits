import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-block.component.html',
  styleUrl: './filter-block.component.scss'
})
export class FilterBlockComponent {
  @Input() userRole: string = ''; 
  @Output() filterChanged = new EventEmitter<{ name: string; startDate: string; endDate: string }>();

  name: string = '';
  startDate: string = '';
  endDate: string = '';

  applyFilter() {
    this.filterChanged.emit({
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
}
