interface User {
  name: string;
}

interface Users {
  [propName: string]: User;
}

const users: Users = {
  4: { name: 'Mark' },
  5: { name: 'Paul' },
};

export default function request(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() => {
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: 'User with ' + userID + ' not found.',
          });
    });
  });
}
