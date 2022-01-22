import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private TIMERINSECONDS: number = 10

  constructor(public service: GameService) {   
  }

  ngOnInit(): void {
    this.service.secondsLeft = this.TIMERINSECONDS
    this.service.setUpTimer()
  }
}