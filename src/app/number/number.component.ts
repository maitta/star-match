import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { numberStatus } from '../service/game.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  @Input() num!: number
  status!: numberStatus

  colors: myColors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
 

  constructor(private service: GameService) {    
  }

  ngOnInit(): void {
    this.status = this.service.getNumberStatus(this.num)
  }


  public handleClick(){
    //debugger
    if(this.status === 'used' || this.service.gameStatus !== 'active'){
      return;
    }    
    this.service.setGameState(this.num, this.status)
  }

  public getNumberColor(): string{
    const newStatus = this.service.getNumberStatus(this.num)
    this.status = newStatus
    return this.colors[newStatus]
  }
}

interface myColors{
  available: string
  used: string
  wrong: string
  candidate: string
  // needed for indexing these objects
  [key: string]: string
}