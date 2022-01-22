import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameService } from '../service/game.service';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent
  let fixture: ComponentFixture<GameComponent>
  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GameService', ['setUpTimer', 'range'],
                  {'gameStatus': 'active'}
                )
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [{ provide: GameService, useValue: spy }]
    })
    .compileComponents();
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent)
    component = fixture.componentInstance
    // ignoring the timer which will have its own test
    gameServiceSpy.setUpTimer.and.callFake(() => {})
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should set the service timer to 10 seconds', () => {
    expect(gameServiceSpy.secondsLeft).toBe(10)
    expect(gameServiceSpy.setUpTimer).toHaveBeenCalledTimes(1)
  })

  it('should render the game instructions', () => {
    const gameElement: HTMLElement = fixture.nativeElement
    expect(gameElement.textContent).toContain('Pick 1 or more numbers that sum to the number of stars')
  })

  it('should display the stars when game is still active', () => {
    const gameElement: HTMLElement = fixture.nativeElement
    const starDisplayElement = gameElement.querySelector('app-star-display')
    expect(starDisplayElement).toBeDefined()
  })

  it('should display the play-again component when time runs out', () => {
    const gameElement: HTMLElement = fixture.nativeElement
    const playAgainElement = gameElement.querySelector('app-play-again')
    expect(playAgainElement).toBeNull()
  })

  it('should display the number pad correctly', () => {
    gameServiceSpy.range.and.returnValue([1,2,3])
    fixture.detectChanges()
    let gameElement: HTMLElement = fixture.nativeElement
    let numberElements = gameElement.querySelectorAll('app-number')!
    expect(numberElements.length).toBe(3)

    gameServiceSpy.range.and.returnValue([1,2,3,4,5,6,7,8,9])
    fixture.detectChanges()
    gameElement: HTMLElement = fixture.nativeElement
    numberElements = gameElement.querySelectorAll('app-number')!
    expect(numberElements.length).toBe(9)
  })

  it('should show the seconds left', () => {
    let gameElement: HTMLElement = fixture.nativeElement
    expect(gameElement.innerText).toContain('Time Remaining: ' + gameServiceSpy.secondsLeft)
  })
});
