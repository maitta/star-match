import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GameService } from '../service/game.service'

import { StarDisplayComponent } from './star-display.component'

describe('StarDisplayComponent', () => {
  let component: StarDisplayComponent
  let fixture: ComponentFixture<StarDisplayComponent>
  let gameServiceSpy: jasmine.SpyObj<GameService>
  const randomNumber = 1 + Math.floor(9 * Math.random())

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GameService', [], {stars: randomNumber})
    await TestBed.configureTestingModule({
      declarations: [ StarDisplayComponent ],
      providers: [{ provide: GameService, useValue: spy }]
    })
    .compileComponents()
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StarDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render as many stars as provided', () => {
    const starDivs = (fixture.nativeElement as HTMLElement).getElementsByClassName('star')
    expect(starDivs.length).toBe(randomNumber)
  })
})
