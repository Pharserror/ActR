# ActN
A Redux Action creator

Since most Redux actions are the same in that they take the form of:

```javascript
  function myAction(stuff) {
    return {
      type: SOME_EVENT,
      stuff
    };
  }
```

This class aims to simplify the creation of actions similar to that of Reflux
where you may simply invoke action creation as such:

```javascript
  export default new ActionCreator([
    'action1',
    ...
  ]);
```

Finally to dispatch actions with Redux you might have something like this:

+=========================================================================+
|-------------------------------- EXAMPLE --------------------------------|
+=========================================================================+
MyActions.js
------------
```javascript
  import ActionCreator from '/path/to/ActionCreator';
  
  export default new ActionCreator([
    'myAction'
  ]);
```

-----------------
UsingMyActions.js
-----------------
```javascript
  import MyActions from '/path/to/MyActions';
  
  dispatch(MyActions.myAction({ dataOrSomething: dataOrSomething }));
```

### Caveats
You MUST supply data to an action AS AN OBJECT so that when it reaches the
reducer you can access it as action.myKey where myKey is the key in the object
supplied to the action that points to the data.
