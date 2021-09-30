import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  secondsLeft!: number  

  constructor(public service: GameService) { 
    this.secondsLeft = 10
    service.secondsLeft = this.secondsLeft
  }

  ngOnInit(): void {
    this.setUpTimer()
  }

  private setUpTimer(): void{
    const id = setInterval(() => {
      if(this.secondsLeft > 0){
        this.secondsLeft--
        // TODO move handling of secondsleft to the service
        this.service.secondsLeft = this.secondsLeft
        console.log(this.service.secondsLeft)
      } else{
        clearInterval(id)
      }      
    }, 1000)
  }
}