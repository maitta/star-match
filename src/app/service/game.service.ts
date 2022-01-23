import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  _stars: number = this.random(1, 9)
  _availableNumbers: number[] = this.range(1, 9)
  _candidateNumbers: number[] = []
  _candidatesWrong!: boolean
  _gameStatus = 'active'
  _secondsLeft!: number

  get stars(): number{
    return this._stars
  }

  get availableNumbers(): number[]{
    return this._availableNumbers
  }

  get candidateNumbers(): number[] {
    return this._candidateNumbers
  }

  set secondsLeft(sec: number) {
    this._secondsLeft = sec
  }

  get secondsLeft(): number {
    return this._secondsLeft
  }

  get gameStatus(): GameStatus {
    return this._availableNumbers.length === 0 
      ? 'won' 
      : this._secondsLeft === 0 ? 'lost' : 'active'
  }

  // TODO use observables
  get candidatesWrong(): boolean {
    this._candidatesWrong = this.sum(this._candidateNumbers) > this.stars
    return this._candidatesWrong
  }

  getNumberStatus(number: number): NumberStatus {
    if(!this._availableNumbers.includes(number)){
      return 'used'
    }
    if(this._candidateNumbers.includes(number)){
      return this.candidatesWrong ? 'wrong' : 'candidate'
    }
    return 'available'
  }

  private log(){
    console.log('logging available...' + this._availableNumbers)
    console.log('logging candidates...' + this._candidateNumbers)    
    console.log('logging wrong...' + this.candidatesWrong)
  }

  setCandidateNumbers(num: number, status: NumberStatus): number[]{
    const newCandidateNumbers = 
          status === 'available'
          ? this._candidateNumbers.concat(num)
          : this._candidateNumbers.filter(cn => cn !== num)
          return newCandidateNumbers
  }

  setGameState(num: number, status: NumberStatus): void{
    const newCandidateNums = this.setCandidateNumbers(num, status)

    if(this.sum(newCandidateNums) !== this._stars){
      this._candidateNumbers = newCandidateNums
      console.log('candidateNumbers have been set...' + this._candidateNumbers)
    }else{
      const newAvailableNums = this._availableNumbers.filter(
        n => !newCandidateNums.includes(n)
      )
      this._stars = this.randomSumIn(newAvailableNums, 9)
      this._availableNumbers = newAvailableNums
      this._candidateNumbers = []
    }
  }

  // Sum an array
  public sum(arr: number[]): number{
    return arr.reduce((acc, curr) => acc + curr, 0)
  }
  
  // create an array of numbers between min and max (edges included)
  public range(min: number, max: number): number[]{
    return Array.from({ length: max - min + 1 }, (_, i) => min + i)
  }

  // pick a random number between min and max (edges included)
  public random(min: number, max: number): number{
   return min + Math.floor(max * Math.random())
  }

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  public randomSumIn(arr: number[], max: number): number{
    const sets: number[][] = [[]]
    const sums = []
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i])
        const candidateSum = this.sum(candidateSet)
        if (candidateSum <= max) {
          sets.push(candidateSet)
          sums.push(candidateSum)
        }
      }
    }
    return sums[this.random(0, sums.length)]
  }

  public setUpTimer(): void{
    const id = setInterval(() => {
      if(this.secondsLeft > 0){
        this.secondsLeft--
        this.secondsLeft = this.secondsLeft
        console.log(this.secondsLeft)
      } else{
        clearInterval(id)
      }      
    }, 1000)
  }
}

export type NumberStatus = "used" | "wrong" | "candidate" | "available"
export type GameStatus = "won" | "lost" | "active"