import defaultPlug from './defaultPlug';

/* ActionCreator
 *
 * Docs have moved to the README.md
 */
export default class ActionCreator {
  /* constructor()
   *
   * @param actions [Array] An array of strings to be used for action names
   *
   * @param options [Object] Any plugins to be used should be passed as { plug: MyPlug }
   *
   * @returns [ActionCreator]
   */
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
        let types = (
          options.plug && options.plug.naming
          ? options.plug.naming(action)
          : defaultPlug.naming(action)
        );

        options.plug && options.plug.destructor
        ? options.destructor(action, this, types)
        : (() => { defaultPlug.destructor(action, this, types); })();
      }, this);
    }
  }
}
