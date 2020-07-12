import Mock = jest.Mock;

export function timerGame(callback: Mock): void {
  setTimeout(() => {
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
