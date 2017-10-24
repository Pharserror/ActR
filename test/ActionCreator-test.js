import ActionCreator from '../src/ActionCreator';

describe('ActionCreator', () => {
  let subject;

  describe('with strings', () => {
    beforeEach(() => {
      subject = new ActionCreator(['myAction']);
    });

    test('it creates actions with types that match the pattern', () => {
      expect(subject.myAction().type).toEqual('ON_MY_ACTION');
    });
  });

  describe('with an object', () => {
    beforeEach(() => {
      subject = new ActionCreator(
        ['my-action'],
        {
          plug: {
            naming: () => ({
              SUCCESS: 'my-action/SUCCESS'
            })
          }
        }
      );
    })

    test.only('it creates an action with the right keys', () => {
      expect(subject['my-action'].SUCCESS()).toEqual({ type: 'my-action/SUCCESS' });
    })
  })
});
