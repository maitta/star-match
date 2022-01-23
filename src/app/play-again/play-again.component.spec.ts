import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GameService, GameStatus } from '../service/game.service'

import { PlayAgainComponent } from './play-again.component'

describe('PlayAgainComponent', () => {
  let component: PlayAgainComponent
  let fixture: ComponentFixture<PlayAgainComponent>
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GameService', ['restartGame'], {gameStatus: 'lost'});
    await TestBed.configureTestingModule({
      declarations: [ PlayAgainComponent ],
      providers: [{ provide: GameService, useValue: spy }]
    })
    .compileComponents()
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAgainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should restart the game when the button is clicked', () => {
    const btn: HTMLElement = fixture.nativeElement.querySelector('button')!
    btn.click()
    expect(gameServiceSpy.restartGame).toHaveBeenCalledTimes(1)
  })

  it('should show the restart message in the red if the game was lost', () => {    
    const playAgainElement: HTMLElement = fixture.nativeElement
    const messageDiv = playAgainElement.getElementsByClassName('message')
    expect(messageDiv.length).withContext('the restart message class should be applied once and only once in the component').toBe(1)
    expect((messageDiv.item(0) as HTMLElement).style.color).toBe("red")
  })

  it('should show the restart message in the green if the game was won', () => {  
    (Object.getOwnPropertyDescriptor(gameServiceSpy, "gameStatus")?.get as jasmine.Spy<() => GameStatus>).and.returnValue('won') 
    fixture.detectChanges() 
    const playAgainElement: HTMLElement = fixture.nativeElement
    const messageDiv = playAgainElement.getElementsByClassName('message')
    expect(messageDiv.length).withContext('the restart message class should be applied once and only once in the component').toBe(1)
    expect((messageDiv.item(0) as HTMLElement).style.color).toBe("green")
  })

  it('should show the Play Again message', () => {
    const playAgainElement: HTMLElement = fixture.nativeElement
    expect(playAgainElement.textContent).toContain("Play Again")
  })

  it('should show the message Game Over if the game was lost', () => {
    const playAgainElement: HTMLElement = fixture.nativeElement
    expect(playAgainElement.textContent).toContain("Game Over")
  })

  it('should show the message Nice if the game was won', () => {
    (Object.getOwnPropertyDescriptor(gameServiceSpy, "gameStatus")?.get as jasmine.Spy<() => GameStatus>).and.returnValue('won') 
    fixture.detectChanges()
    const playAgainElement: HTMLElement = fixture.nativeElement
    expect(playAgainElement.textContent).toContain("Nice")
  })
})
