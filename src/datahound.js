/*!
* Datahound.js
* Chris Thomson
* Version 0.1b
* MIT Licensed
*/

var Datahound = function () {
  var _this = this;

  this.validators = {
    text: /^[a-zA-Z]+$/i,
    email: /.+@.+[.]+.+/i,
    numbers: /^[0-9]+$/i
  };

  this.functionOnValidate = function (element, success) {
    if (success) {
      element.style.backgroundColor = "initial";
    } else {
      element.style.backgroundColor = "red";
    }
  }

  this.validate = function (element) {
    if (!element.hasAttribute("data-hound-required") && element.value.match(/^\s*$/)) {
        _this.functionOnValidate(element, true);
        return true;
    }
    var houndType = element.getAttribute("data-hound-type");
    if(_this.validators.hasOwnProperty(houndType)) {
      var doesMatch = element.value.match(_this.validators[houndType]);
      if(doesMatch != null) {
        _this.functionOnValidate(element, true);
        return true;
      } else {
        _this.functionOnValidate(element, false);
        return false;
      }
    } else {
      console.log("Warning, type " + houndType + " is not defined.");
      return true;
    }

  }
  this.validateType = function (type) {
    var elements = document.querySelectorAll('[data-hound-type=' + type +']');
    var allMatched = true;

    for(var i = 0; i < elements.length; i++) {
      allMatched = _this.validate(elements[i]) ? allMatched : false;
    }

    return allMatched;
  };
  this.validateAll = function () {
    var elements = document.querySelectorAll("[data-hound-type]");
    var allMatched = true;

    for(var i = 0; i < elements.length; i++) {
      allMatched = _this.validate(elements[i]) ? allMatched : false;
    }

    return allMatched;
  };

  this.validateGroup = function (groupType) {
    var elements = document.querySelectorAll("[data-hound-group=" + groupType + "]");
    var allMatched = true;

    for (var i = 0; i < elements.length; i++) {
      allMatched = _this.validate(elements[i]) ? allMatched : false;
    }
	
	return allMatched;
  }
  this.bindValidationEvents = function () {
    var elements = document.querySelectorAll("[data-hound-bind]");
    for(var i = 0; i < elements.length; i++) {
      var bindType = elements[i].getAttribute("data-hound-bind");
      elements[i]["on" + bindType] = function () {
        _this.validate(this);
      }
    }
  };
}
