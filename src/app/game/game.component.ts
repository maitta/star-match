import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  /*gameStatus = availableNumbers.length === 0 
      ? 'won' 
      : secondsLeft === 0 ? 'lost' : 'active';*/

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

  public handleClick(num: number){
    console.log(num)
/*
    if(status === 'used' || gameStatus !== 'active'){
      return;
    }
    const newCandidateNums = 
          status === 'available'
          ? candidateNumbers.concat(number)
          : candidateNumbers.filter(cn => cn !== number);
    
    setGameState(newCandidateNums);*/
  }

}
