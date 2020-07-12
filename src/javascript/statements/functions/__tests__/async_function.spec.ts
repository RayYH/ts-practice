test('simple', async () => {
  const stack: string[] = [];

  function resolveAfter2Seconds(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout((): void => {
        resolve('resolved');
      }, 2000);
    });
  }

  async function asyncCall(): Promise<any> {
    stack.push('calling');
    const result = await resolveAfter2Seconds();
    stack.push(result);
  }

  await asyncCall();

  expect(stack).toEqual(['calling', 'resolved']);
});
