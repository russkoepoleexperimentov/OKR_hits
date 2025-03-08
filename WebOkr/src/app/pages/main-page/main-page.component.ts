import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';
import { AddButtonComponent } from '../../components/add-application-button/add-application-button.component';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent,FilterBlockComponent,ApplicationCardComponent, AddButtonComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  username:string ='dasdasdasdasdasdasdasdasdasdasdas';
}
  