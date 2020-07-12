import { fetchData } from '../helpers';

interface consumeString {
  (param: string): void;
}

test('the data is peanut butter', (done) => {
  function fetchData(callback: consumeString): void {
    const data = 'peanut butter';
    callback(data);
  }

  function callback(data: string): void {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

test('promises', () => {
  return fetchData(true).then((data) => {
    expect(data).toBe('peanut butter');
  });
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData(false).catch((e) => expect(e).toMatch('error'));
});

test('the data is peanut butter', () => {
  return expect(fetchData(true)).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
  return expect(fetchData(false)).rejects.toMatch('error');
});

test('the data is peanut butter', async () => {
  const data = await fetchData(true);
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData(false);
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  await expect(fetchData(true)).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData(false, true)).rejects.toThrow('error');
});
