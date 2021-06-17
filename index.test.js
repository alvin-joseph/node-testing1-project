const utils = require('./index')

describe('[Exercise 1] trimProperties', () => {
  test('[1] returns an object with the properties trimmed', () => {
    // EXAMPLE
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.trimProperties(input)
    expect(actual).toEqual(expected)
  })
  test('[2] returns a copy, leaving the original object intact', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    utils.trimProperties(input)
    expect(input).toEqual({ foo: '  foo ', bar: 'bar ', baz: ' baz' })
  })
})

describe('[Exercise 2] trimPropertiesMutation', () => {
  test('[3] returns an object with the properties trimmed', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.trimPropertiesMutation(input)
    expect(actual).toEqual(expected)
  })
  test('[4] the object returned is the exact same one we passed in', () => {
    const input = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.trimPropertiesMutation(input)
    expect(actual).toBe(input)
  })
})

describe('[Exercise 3] findLargestInteger', () => {
  test('[5] returns the largest number in an array of objects { integer: 2 }', () => {
    const arr = [{ integer: 1}, {integer: 2}, {integer:3}]
    const actual = utils.findLargestInteger(arr)
    expect(actual).toBe(3)
  })
})

describe('[Exercise 4] Counter', () => {
  let counter
  beforeEach(() => {
    counter = new utils.Counter(3) // each test must start with a fresh couter
  })
  test('[6] the FIRST CALL of counter.countDown returns the initial count', () => {
    expect(counter.countDown()).toBe(3)
  })
  test('[7] the SECOND CALL of counter.countDown returns the initial count minus one', () => {
    counter.countDown()
    expect(counter.countDown()).toBe(2)
  })
  test('[8] the count eventually reaches zero but does not go below zero', () => {
    expect(counter.countDown()).toBe(3)
    expect(counter.countDown()).toBe(2)
    expect(counter.countDown()).toBe(1)
    expect(counter.countDown()).toBe(0)
    expect(counter.countDown()).not.toBe(-1)
  })
})

describe('[Exercise 5] Seasons', () => {
  let seasons
  beforeEach(() => {
    seasons = new utils.Seasons() // each test must start with fresh seasons
  })
  test('[9] the FIRST call of seasons.next returns "summer"', () => {
    expect(seasons.next()).toBe('summer')
  })
  test('[10] the SECOND call of seasons.next returns "fall"', () => {
    expect(seasons.next()).toBe('summer')
    expect(seasons.next()).toBe('fall')
  })
  test('[11] the THIRD call of seasons.next returns "winter"', () => {
    expect(seasons.next()).toBe('summer')
    expect(seasons.next()).toBe('fall')
    expect(seasons.next()).toBe('winter')
  })
  test('[12] the FOURTH call of seasons.next returns "spring"', () => {
    seasons.next()
    seasons.next()
    seasons.next()
    expect(seasons.next()).toBe('spring')
  })
  test('[13] the FIFTH call of seasons.next returns again "summer"', () => {
    let answer = ''
    for (let i=0; i < 5; i++) {
      answer = seasons.next()
    }
    expect(answer).toBe('summer')
  })
  test('[14] the 40th call of seasons.next returns "spring"', () => {
    let answer = ''
    for (let i=0; i < 40; i++) {
      answer = seasons.next()
    }
    expect(answer).toBe('spring')
  })
})

describe('[Exercise 6] Car', () => {
  let charger
  beforeEach(() => {
    charger = new utils.Car('charger', 20, 30) // each test must start with a fresh car
  })
  test('[15] driving the car returns the updated odometer', () => {
    expect(charger.drive(100)).toBe(100)
    expect(charger.drive(100)).toBe(200)
    expect(charger.drive(100)).toBe(300)
    expect(charger.drive(200)).toBe(500)
  })
  test('[16] driving the car uses gas', () => {
    charger.drive(600)
    expect(charger.drive(200)).toBe(600) //tank is empty so can't drive anymore
    expect(charger.drive(200)).toBe(600)
    expect(charger.drive(200)).toBe(600)
    //expect(charger.tank).toBe(0)
  })
  test('[17] refueling allows to keep driving', () => {
    charger.drive(600)
    charger.refuel(10)
    charger.drive(600)
    expect(charger.odometer).toBe(900)
    charger.refuel(10)
    charger.drive(600)
    expect(charger.odometer).toBe(1200)
  })
  test('[18] adding fuel to a full tank has no effect', () => {
    charger.refuel(1000)
    charger.drive(1000)
    expect(charger.odometer).toBe(600)
  })
})

describe('[Exercise 7] isEvenNumberAsync', () => {
  test('[19] resolves true if passed an even number', async () => {
    const input = 2
    const result = await utils.isEvenNumberAsync(input)
    expect(result).toBe(true)
  })
  test('[20] resolves false if passed an odd number', async () => {
    const input = 3
    const result = await utils.isEvenNumberAsync(input)
    expect(result).toBe(false)
  })
  test('[21] rejects an error with the message "number must be a number" if passed a non-number type', 
    async () => {
    try {
      await utils.isEvenNumberAsync('howdy')
    } catch (error) {
      expect(error.message).toMatch(/number must be a number/i)
    }
  })
  test('[22] rejects an error with the message "number must be a number" if passed NaN', async () => {
    try {
      await utils.isEvenNumberAsync(NaN)
    } catch (error) {
      expect(error.message).toMatch(/number must be a number/i)
    }
  })
})
