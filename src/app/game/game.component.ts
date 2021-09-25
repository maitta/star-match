import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  secondsLeft!: number

  constructor() { 
    this.secondsLeft = 10
  }

  ngOnInit(): void {
    this.setUpTimer()
  }

  private setUpTimer(): void{
    const id = setInterval(() => {
      if(this.secondsLeft > 0){
        this.secondsLeft--
      } else{
        clearInterval(id)
      }      
    }, 1000)
  }

}
