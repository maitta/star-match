import { Component, OnInit, Input } from '@angular/core';

import { UtilsService } from '../service/utils.service';

@Component({
  selector: 'app-star-display',
  templateUrl: './star-display.component.html',
  styleUrls: ['./star-display.component.css']
})
export class StarDisplayComponent implements OnInit {

  stars!: number[]


  constructor(private utils: UtilsService) {
    
   }

  ngOnInit(): void {
    const num = this.utils.random(1, 9)
    this.stars = this.utils.range(1, num)
  }

}
