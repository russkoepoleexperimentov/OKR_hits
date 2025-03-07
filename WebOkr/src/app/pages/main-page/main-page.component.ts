import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterBlockComponent } from '../../components/filter-block/filter-block.component';
import { ApplicationCardComponent } from '../../components/application-card/application-card.component';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent,FilterBlockComponent,ApplicationCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
