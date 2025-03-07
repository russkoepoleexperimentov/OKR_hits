import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-block',
  imports: [CommonModule,FormsModule],
  templateUrl: './filter-block.component.html',
  styleUrl: './filter-block.component.scss'
})
export class FilterBlockComponent {
  @Input() name: string = '';
  startDate :string ='';
  endDate: string = '';
  applyFilter() {
      console.log(this.name,this.startDate,this.endDate);
  }
}
