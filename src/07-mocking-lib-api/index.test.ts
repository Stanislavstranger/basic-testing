import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const url = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/test';

  const response = {
    data: 'test',
  };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnThis();
    (axios.get as jest.Mock).mockResolvedValue(response);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenLastCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    expect(axios.get).not.toHaveBeenCalled();

    await throttledGetDataFromApi(relativePath);

    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const resultData = await throttledGetDataFromApi(relativePath);

    expect(resultData).toEqual(response.data);
  });
});
