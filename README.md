# Datahound.js
A simple, no-frills input validation library written in JavaScript.

---

## Requirements

Datahound has no dependencies, but requires at least Firefox 3.5/Chrome 1/Internet Explorer 9/Safari 3.2/Opera 10.

---

## Syntax


### The markup
Datahound uses `data-` attributes in `input` elements to derive the type of validation that it should perform on that field. For example, take the following line:

```html
<input type="text" data-hound-type="email" data-hound-bind="blur" data-hound-group="UserPreferences" data-hound-required>
```

Let's break this down into the individual element attributes -

- `data-hound-type` - This is the type of validation that Datahound will perform on this input field. The included ones are `text`, `numbers` and `email`. There may be more in the future - but you are also free to add your own (we'll get onto this later).
- `data-hound-bind` - This attribute is not required, but allows you to bind a rerun of the validation procedure to a certain event. For example, in this instance, the `onblur` event triggers a revalidation.
- `data-hound-group` - This allows the user to put the different input elements into logical groups. Later on, we'll show how we can validate input elements based on their group (validating only elements grouped under `UserPreferences` for example).
- `data-hound-required` - If this attribute is present, data-hound will not mark an empty field (includes whitespace) as valid. If it is not present, then an empty field will be marked as valid.


### The JavaScript

There isn't a lot of JavaScript to worry about with Datahound. First you must instanciate the Datahound object, like so.

```javascript
var datahound = new Datahound();
```

Now, wasn't that simple? Let's go through the functions:

- `datahound.bindValidationEvents();`- This method hooks up the events described in the `data-hound-bind` attribute to their respective elements. You must only call this *after* you've loaded in all your input fields - or the events for fields that haven't been loaded yet won't be bound. Equally, if you're dynamically loading in fields that use this attribute, you must call it *again* once you've loaded them.
- `datahound.validateAll()` - This method validates all elements with a `data-hound-type` attribute. If all validate correctly, it returns `true`, else it returns `false`.
- `datahound.validateGroup(groupName)` - This method validates all elements of a group `groupName`. It will only validate elements with the `data-hound-group` attribute set to the provided parameter. If all validate correctly, it returns `true`, else it returns `false`.
- `datahound.validateType(type)` - This method validates all elements that are validating based on type `type`. It will only validate elements with the `data-hound-type` attribute set to the provided parameter. If all validate correctly, it returns `true`, else it returns `false`.

----

If you want to add your own validation regexes, you can do so like this.

`datahound.validators["yourValidator"] = \[a-zA-Z]*\i`

For the time being, you can only validate based on regex. In the future, there may be an interface to take functions for validation.

---

Datahound executes a function once it has determined the validity of an element. By default, this function sets the background colour of an element to red if the validation is unsuccessful, and green if it is successful. You can, of course, overwrite this fairly simplistic routine like so.

`datahound.functionOnValidate = function (element, success) { //your stuff here }`

The two parameters passed are `element`, which is the input DOM element with which the validation is concerned, and `success`, which is a boolean that determines whether or not this element has been validated. If `true`, the validation passed - if `false`, it did not.
