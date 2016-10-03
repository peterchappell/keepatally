import FLAGS from '../consts/tallyStrokeFlags'
import getStrokes from './getStrokesArrayForBlock';

describe('When the current tally block is less than the total count, all strokes will be stroked', () => {
  const completedArray = Array(5).fill(FLAGS.complete);
  test('total count 7, 1st block', () => {
    expect(getStrokes(0, 7, 0)).toEqual(completedArray)
  })
  test('total count 5, first block', () => {
    expect(getStrokes(0, 5, 0)).toEqual(completedArray)
  })
  test('total count 10, second block, goal 22', () => {
    expect(getStrokes(1, 10, 22)).toEqual(completedArray)
  })
})

describe('When the current tally block is greater than the total count but less than the goal, all strokes will be waiting', () => {
  const waitingArray = Array(5).fill(FLAGS.waiting);
  test('total count 7, third block, goal is 22', () => {
    expect(getStrokes(2, 7, 22)).toEqual(waitingArray)
  })
  test('total count 7, fourth block, goal is 22', () => {
    expect(getStrokes(3, 7, 22)).toEqual(waitingArray)
  })
  test('total count 7, fourth block, goal is 20', () => {
    expect(getStrokes(3, 7, 20)).toEqual(waitingArray)
  })
})

describe('When the current tally block is only partially completed (and with no goal)', () => {
  test('total count 3, first block', () => {
    expect(getStrokes(0, 3, 0)).toEqual([
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.empty,
      FLAGS.empty
    ])
  })
  test('total count 9, second block', () => {
    expect(getStrokes(1, 9, 0)).toEqual([
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.empty
    ])
  })
})

describe('When the current tally block is only partially completed (and with a goal past the current block)', () => {
  test('total count 3, current tally block index 0, goal 20', () => {
    expect(getStrokes(0, 3, 20)).toEqual([
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.waiting,
      FLAGS.waiting
    ])
  })
  test('total count 9, current tally block index 1, goal 22', () => {
    expect(getStrokes(1, 9, 22)).toEqual([
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.complete,
      FLAGS.waiting
    ])
  })
})
