export function fetchData(isResolved: boolean, isThrown = false): Promise<string> {
  return new Promise(function (resolve, reject) {
    if (isThrown) {
      throw new Error("error");
    }

    isResolved
      ? setTimeout(function () {
          resolve('peanut butter');
        }, 500)
      : setTimeout(function () {
          reject('error');
        }, 500);
  });
}

export default { fetchData };
