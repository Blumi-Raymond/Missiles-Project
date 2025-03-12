import { Component } from '@angular/core';
import { MissilePipe } from '../pipe/missile.pipe';
import { ChangeColorDirective } from '../directive/change-color.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MissilePipe,ChangeColorDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title=' הפתרון המדויק לכל מטרה - מהשמיים ועד הקרקע'

}
