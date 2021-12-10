import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/dbv.Facade';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  role :string = "";
  constructor(private selector : SelectorService) { }

  ngOnInit(): void {
    this.selector.getRole().subscribe(ele=>{
      this.role = ele;
    })
  }
}

