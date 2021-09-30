import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '../service/game.service';

@Component({
  selector: 'app-star-display',
  templateUrl: './star-display.component.html',
  styleUrls: ['./star-display.component.css']
})
export class StarDisplayComponent implements OnInit {

  @Input() num!: number

  constructor(public service: GameService) { 
  }

  ngOnInit(): void {
  }

}
