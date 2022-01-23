import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast'
import { TestBed } from '@angular/core/testing'

import { GameService } from './game.service'

describe('GameService', () => {
  let service: GameService
  let randomNumber = 1 + Math.floor(9 * Math.random())
  const randomLower = 1 + Math.floor((randomNumber - 1) * Math.random())

  beforeEach(() => {
    randomNumber = (randomNumber === 1) ? randomNumber + 1 : randomNumber
    TestBed.configureTestingModule({})
    service = TestBed.inject(GameService)
    if(randomLower >= randomNumber) throw 'wrong test date, cannot continue'
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should be active as long as there\'s time left', () => {
    expect(service.gameStatus).toBe('active')
    service.secondsLeft = 7
    expect(service.gameStatus).toBe('active')
    service.secondsLeft = 4
    expect(service.gameStatus).toBe('active')
    service.secondsLeft = 1
    expect(service.gameStatus).toBe('active')
  })

  it('should reflect a victory when all numbers have been cleared', () => {
    spyOnProperty(service, "availableNumbers", "get").and.returnValue([])
    expect(service.gameStatus).toBe('won')
  })

  it('should reflect a loss when the time is up', () => {    
    service.secondsLeft = 0
    expect(service.gameStatus).toBe('lost')
  })

  it('should handle wrong candidates properly', () => {
    const sumSpy = spyOn(service, 'sum').and.returnValue(randomNumber)
    const starsSpy = spyOnProperty(service, "stars", "get").and.returnValue(randomLower)
    expect(service.candidatesWrong).toBe(true)

    sumSpy.and.returnValue(randomLower)
    starsSpy.and.returnValue(randomNumber);
    expect(service.candidatesWrong).toBe(false)
  })

  it('should get the used status when the number is not available', () => {
    spyOnProperty(service, "availableNumbers", "get").and.returnValue([])
    expect(service.getNumberStatus(randomNumber)).toBe('used')
  })

  it('should get the -wrong- status when the number cannot be used to solve', () => {
    spyOnProperty(service, "availableNumbers", "get").and.returnValue([randomNumber])
    spyOnProperty(service, "candidateNumbers", "get").and.returnValue([randomNumber])
    spyOnProperty(service, "candidatesWrong", "get").and.returnValue(true)
    expect(service.getNumberStatus(randomNumber)).toBe('wrong')
  })

  it('should get the candidate status when the number could be used to solve', () => {
    spyOnProperty(service, "availableNumbers", "get").and.returnValue([randomNumber])
    spyOnProperty(service, "candidateNumbers", "get").and.returnValue([randomNumber])
    spyOnProperty(service, "candidatesWrong", "get").and.returnValue(false)
    expect(service.getNumberStatus(randomNumber)).toBe('candidate')
  })

  it('should get the available status when the number is neither a candidate for solving nor has it been used', () => {
    spyOnProperty(service, "availableNumbers", "get").and.returnValue([randomNumber])
    spyOnProperty(service, "candidateNumbers", "get").and.returnValue([])
    spyOnProperty(service, "candidatesWrong", "get").and.returnValue(false)
    expect(service.getNumberStatus(randomNumber)).toBe('available')
  })

  it('should set available numbers as candidates', () => {
    const res = service.setCandidateNumbers(randomNumber, "available")
    expect(res).toContain(randomNumber)
  })

  it('should remove non available numbers from the candidates', () => {
    const res1 = service.setCandidateNumbers(randomNumber, "available")
    expect(res1).toContain(randomNumber)

    const res2 = service.setCandidateNumbers(randomNumber, "used")
    expect(res2.length).toBe(res1.length - 1)
    expect(res2).not.toContain(randomNumber)
  })

  it('should set the right candidates when selected number does not solve', () => {
    const dummyCandidates: number[] = [2,4,6]
    spyOn(service, 'setCandidateNumbers').and.returnValue(dummyCandidates)
    spyOn(service, 'sum').and.returnValue(randomNumber)
    spyOnProperty(service, "stars", "get").and.returnValue(randomLower)
    service.setGameState(randomNumber, 'available')    
    expect(service.setCandidateNumbers).toHaveBeenCalled()
    expect(service.sum).toHaveBeenCalled()
    expect(service.candidateNumbers).toEqual(dummyCandidates)
  })

  it('should set the right candidates when selected number does solve', () => {
    const dummyCandidates: number[] = [1,3,5,8]
    const dummyAvailableNumbers: number[] = [2,4,6,9]
    spyOn(service, 'setCandidateNumbers').and.returnValue(dummyCandidates)
    spyOn(service, 'randomSumIn').and.returnValue(randomNumber)
    spyOn(service, 'sum').and.returnValue(randomNumber)
    spyOnProperty(service, "stars", "get").and.returnValue(randomNumber)
    spyOnProperty(service, "availableNumbers", "get").and.returnValue(dummyAvailableNumbers)
    service.setGameState(randomNumber, 'available')    
    expect(service.setCandidateNumbers).toHaveBeenCalled()
    expect(service.sum).toHaveBeenCalled()
    expect(service.stars).toBe(randomNumber)
    expect(service.availableNumbers).toEqual(dummyAvailableNumbers) 
    expect(service.candidateNumbers).toEqual([])
  })
})
