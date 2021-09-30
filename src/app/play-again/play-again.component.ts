import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-play-again',
  templateUrl: './play-again.component.html',
  styleUrls: ['./play-again.component.css']
})
export class PlayAgainComponent implements OnInit {

  constructor(public service: GameService) { }

  ngOnInit(): void {
  }

  handleClick(){
    location.reload()
  }

  getColor(): string {
    return this.service.gameStatus === 'lost' ? 'red' : 'green'
  }

}
