import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  return {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: jest.requireActual('./index').unmockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    console.log = jest.fn();

    mockOne();
    mockTwo();
    mockThree();

    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    console.log = jest.fn();

    unmockedFunction();

    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
