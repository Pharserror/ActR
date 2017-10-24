/* ACTION CREATOR FOR REDUX ACTIONS
 *
 * Since most Redux actions are the same in that they take the form of:
 *
 * function myAction(stuff) {
 *   return {
 *     type: SOME_EVENT,
 *     stuff
 *   };
 * }
 *
 * This class aims to simplify the creation of actions similar to that of Reflux
 * where you may simply invoke action creation as such:
 *
 * export default new ActionCreator([
 *   'action1',
 *   ...
 * ]);
 *
 * Finally to dispatch actions with Redux you might have something like this:
 *
 * +=========================================================================+
 * |-------------------------------- EXAMPLE --------------------------------|
 * +=========================================================================+
 * MyActions.js
 * ------------
 * import ActionCreator from '/path/to/ActionCreator';
 *
 * export default new ActionCreator([
 *   'myAction'
 * ]);
 *
 * -----------------
 * UsingMyActions.js
 * -----------------
 * import MyActions from '/path/to/MyActions';
 *
 * dispatch(MyActions.myAction({ dataOrSomething: dataOrSomething }));
 *
 * NOTE: You MUST supply data to an action AS AN OBJECT so that when it reaches
 *       the reducer you can access it as action.myKey where myKey is the key
 *       in the object supplied to the action that points to the data
 *
 */
import defaultPlug from './defaultPlug';

export default class ActionCreator {
  constructor(actions, options = {}) {
    // Actions needs to be an array of strings
    if (actions.constructor.name !== 'Array') {
      throw 'You must supply an array of actions to ActionCreator!';
    } else {
      actions.forEach(action => {
        /* For each action we pass it to a plugin for naming in-case the user
         * has their own scheme they would rather use than the default
         *
         * Plugs are free to return an array, object, or string - they may opt
         * to then use either the built-in destructor or provide one themselves
         */
        let types = options.plug ? options.plug(action) : defaultPlug.naming(action);

        options.destructor
        ? options.destructor(action, this, types)
        : (() => { defaultPlug.destructor(action, this, types); })();
      }, this);
    }
  }
}
