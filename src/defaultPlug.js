const defaultPlug = {
  naming: action => {
    // If the action is not a string then we throw an error
    if (action.constructor.name !== 'String') {
      throw 'Every action supplied to ActionCreator must be a string!';
    }
    // All actions should be in the format of "ON_SOME_EVENT"
    let actionEventName = 'ON';
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

    return actionEventName;
  },
  /* destructor()
   *
   * @param action [String] A string like 'myAction'
   *
   * @param context [Function] this
   *
   * @param types [Any] Could be an Array, Object, or String
   *
   * @returns [null]
   */
  destructor: (action, context, types) => {
    if (!!types) {
      switch (types.constructor.name) {
        case 'Array': {
          /* In this case our types are something like:
           * ['action1', 'action2', ...]
           *
           * And we want to return something like:
           * { action1: options => { ...options, type: 'action1' } }
           */
          types.map(type => {
            context[action] = {
              [type]: (options => ({
                ...options,
                type
              }))
            };
          });
          break;
        }
        case 'Object': {
          /* In this case our types should be something like:
           * {
           *   FAILURE: 'my-action/FAILURE',
           *   SUCCESS: 'my-action/SUCCESS'
           * }
           *
           * And we will return something like this:
           * { SUCCESS: options => { ...options, type: 'my-action/SUCCESS' } }
           *
           * And then it may be called like this:
           * actions.myAction.SUCCESS(options);
           */
          Object.keys(types).map(type => {
            context[action] = {
              ...(context[action] || {}),
              [type]: (options = {}) => ({
                ...options,
                type: types[type]
              })
            };
          });
          break;
        }
        case 'String': {
          /* Should give us something like this:
           * { myAction: options => ({ ...options, type: 'ON_MY_ACTION' })
           */
          context[action] = options => ({
            ...options,
            type: types
          });
          break;
        }
      }
    } else { throw 'You must supply action types!'; }
  }
}

export default defaultPlug;
