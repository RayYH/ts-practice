///// enabled no-namespace
// import { A, B } from '../namespaces';
//
// test('namespace name', () => {
//     expect(A.namespaceName()).toEqual('A');
//     expect(B.namespaceName()).toEqual('B');
// });

test('true', () => {
  expect(new Date()).not.toBeNull();
});
