import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GameService, NumberStatus, GameStatus } from '../service/game.service'

import { NumberComponent } from './number.component'

describe('NumberComponent', () => {
  let component: NumberComponent
  let fixture: ComponentFixture<NumberComponent>
  let gameServiceSpy: jasmine.SpyObj<GameService>
  let randomNum: number

  beforeEach(async () => {
    const spy = jasmine.createSpyObj(
                'ValueService', ['getNumberStatus', 'setGameState'],
                {gameStatus: 'active' })    
    await TestBed.configureTestingModule({
      declarations: [ NumberComponent ],
      providers: [
        { provide: GameService, useValue: spy }
      ]
    })
    .compileComponents()
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberComponent)
    component = fixture.componentInstance
    randomNum = 1 + Math.floor(9 * Math.random())
    component.num = randomNum
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the number status locally on initialization', () => {
    let res: NumberStatus = "used"
    gameServiceSpy.getNumberStatus.and.returnValue(res)
    fixture.detectChanges()
    expect(component.status).toEqual(res)

    res = "wrong"
    gameServiceSpy.getNumberStatus.and.returnValue(res)
    fixture.detectChanges()
    expect(component.status).toEqual(res)
  })

  it("should ignore clicks on used numbers", () => {
    expect(gameServiceSpy.gameStatus).withContext('this test needs game status to be active').toBe('active')

    let res: NumberStatus = "used"
    gameServiceSpy.getNumberStatus.and.returnValue(res)
    fixture.detectChanges()
    expect(component.status).toBe(res)    
    component.handleClick()
    expect(gameServiceSpy.setGameState).toHaveBeenCalledTimes(0)
  })

  it('should ignore clicks after the game finishes', () => {
    expect(component.status).withContext('this test needs number status to NOT be used').not.toBe('used');

    (Object.getOwnPropertyDescriptor(gameServiceSpy, "gameStatus")?.get as jasmine.Spy<() => GameStatus>).and.returnValue('lost')
    expect(gameServiceSpy.gameStatus).withContext('this test needs game status NOT to be active').not.toBe('active')
    component.handleClick()
    expect(gameServiceSpy.setGameState).toHaveBeenCalledTimes(0);

    (Object.getOwnPropertyDescriptor(gameServiceSpy, "gameStatus")?.get as jasmine.Spy<() => GameStatus>).and.returnValue('won')
    expect(gameServiceSpy.gameStatus).not.toBe('active')
    component.handleClick()
    expect(gameServiceSpy.setGameState).toHaveBeenCalledTimes(0)
  })

  it('should set the game state when clicking on an available number while the game is still active', () =>{    
    let numStatus: NumberStatus = "available"
    gameServiceSpy.getNumberStatus.and.returnValue(numStatus)
    fixture.detectChanges()
    expect(component.status).withContext('this test needs number status to NOT be used').not.toBe('used');
    expect(gameServiceSpy.gameStatus).withContext('this test needs game status to be active').toBe('active');
    component.handleClick()
    expect(gameServiceSpy.setGameState).toHaveBeenCalledTimes(1)
    expect(gameServiceSpy.setGameState).toHaveBeenCalledWith(randomNum, numStatus)
  })

  it('should set the right color for the number', () => {
    let numStatus: NumberStatus = "available"
    expect(stubColorAssignment(numStatus)).toBe(component.colors.available)

    numStatus = "candidate"
    expect(stubColorAssignment(numStatus)).toBe(component.colors.candidate)

    numStatus = "used"
    expect(stubColorAssignment(numStatus)).toBe(component.colors.used)

    numStatus = "wrong"
    expect(stubColorAssignment(numStatus)).toBe(component.colors.wrong)
  })

  function stubColorAssignment(status: NumberStatus): string {
    gameServiceSpy.getNumberStatus.and.returnValue(status)
    return component.getNumberColor()    
  }

  it('should handle a click event', () => {
    spyOn(component, 'handleClick')
    fixture.detectChanges()
    const btn: HTMLElement = fixture.nativeElement.querySelector('button')!
    btn.click() 
    expect(component.handleClick).toHaveBeenCalledTimes(1)
  })

  it('should display the right color for the number', () => {
    let numStatus: NumberStatus = "available"     
    expect(getButtonAndStubColorAssignment(numStatus).style.backgroundColor).toBe(component.colors.available)

    numStatus = "used"
    expect(getButtonAndStubColorAssignment(numStatus).style.backgroundColor).toBe(component.colors.used)

    numStatus = "wrong"
    expect(getButtonAndStubColorAssignment(numStatus).style.backgroundColor).toBe(component.colors.wrong)

    numStatus = "candidate"
    expect(getButtonAndStubColorAssignment(numStatus).style.backgroundColor).toBe(component.colors.candidate)
  })

  function getButtonAndStubColorAssignment(status: NumberStatus): HTMLElement{
    stubColorAssignment(status)
    fixture.detectChanges()
    let btn: HTMLElement = fixture.nativeElement.querySelector('button')!
    return btn
  }

  it('should display the right number for the button', () => {
    expect((fixture.nativeElement as HTMLElement).innerText).toContain(randomNum.toString())
  })
})

