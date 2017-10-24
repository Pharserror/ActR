import ActionCreator from '../src/ActionCreator';

describe('ActionCreator', () => {
  let subject;

  beforeEach(() => {
    subject = new ActionCreator(['myAction']);
  });

  test('it creates actions with types that match the pattern', () => {
    expect(subject.myAction().type).toEqual('ON_MY_ACTION');
  });
});
