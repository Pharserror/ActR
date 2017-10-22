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
 * NOTE: You MUST supply data to an action as an object so that when it reaches
 *       the reducer you can access it as action.myKey where myKey is the key
 *       in the object supplied to the action that points to the data
 *
 */

export default class ActionCreator {
  constructor(actions) {
    // Actions needs to be an array of strings
    if (actions.constructor.name !== 'Array') {
      throw "You must supply an array of actions to ActionCreator!";
    } else {
      actions.forEach((action) => {
        // If the action is not a string then we throw an error
        if (action.constructor.name !== 'String') {
          throw "Every action supplied to ActionCreator must be a string!";
        }
        // All actions should be in the format of "ON_SOME_EVENT"
        let actionEventName = "ON";
        // We create some space to store the indexes of each capital character
        let indexes = [];
        // We look through the string and find and store the index of capital characters
        action.replace(/[A-Z]/g, (match, index, actionName) => {
          indexes.push(index);
        });
        // If there are no capital characters then we just capitalize the whole string
        if (indexes[0] === undefined) {
          actionEventName += '_' + action.toUpperCase();
        } else {
          /* Otherwise we capitalize the first part of an action like myAction
           * so that we get "_MY" */
          actionEventName += '_' + action.substr(0, indexes[0]).toUpperCase();
          /* Then for each index we found above we capitalize that part of the
           * string to "_ACTION" */
          indexes.forEach((index, i) => {
            /* We want to check if we have reached the end of the string so that
             * we may properly calculate the length of the substr */
            let length = indexes[i + 1] === undefined
                         ? action.length - index
                         : indexes[i + 1] - index;
            actionEventName += '_' + action.substr(index, length).toUpperCase();
          });
          // We should now have an actionEventName like "ON_MY_ACTION"
        }
        this[action] = (options) => {
          let prop;
          let returnValue = { type: actionEventName };
          if (!!options) {
            if (options.constructor.name !== 'Object') {
              throw "You must supply arguments to an action as an object!";
            }
            // For every prop in options we add it to the return value
            for (prop in options) {
              returnValue[prop] = options[prop];
            }
          }
          /* Finally we have a return value like:
           * {
           *   type: "ON_MY_ACTION",
           *   otherStuff: otherStuff
           * }
           * And we should be able to dispatch this action as myAction
           */
          return returnValue;
        };
      }, this);
    }
  }
}
