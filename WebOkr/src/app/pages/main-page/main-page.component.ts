import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { AddApplicationButtonComponent } from '../../components/add-application-button/add-application-button.component';
import { NewRequestDialogComponent } from '../../components/new-request-dialog/new-request-dialog.component';

@Component({
  selector: 'app-main-page',
  standalone:true,
  imports: [HeaderComponent,FilterBlockComponent,ApplicationCardComponent, AddApplicationButtonComponent,NewRequestDialogComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  username:string ='dasdasdasdasdasdasdasdasdasdasdas';
}
  