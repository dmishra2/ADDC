'use strict';

var Q = require('q')
  , async = require('async')
  , wd = require('wd')
  , Asserter = wd.Asserter
  , chai = require("chai");
var rek = require('rekuire')
//, config = rek('config');
import * as android from '../../pages/andriodpom.json';
import * as ios from '../../pages/iospom.json';
import * as common from '../../pages/common.json'
const elements = {
  android: android,
  ios: ios,
  common: common
}

var tagChaiAssertionError = function (err) {
  err.retriable = err instanceof chai.AssertionError;
  throw err;
};

exports.getListOfElementsTextById = function (driver, id) {
  return Q.Promise(function (resolve) {
    driver.elementsById(id).then(function (elements) {
      async.map(elements, function (element, callback) {
        driver.text(element).then(function (text) {
          callback(null, text);
        });
      }, function (err, results) {
        resolve(results);
      });
    }, function (err) {
      resolve(err);
    });
  });
};

exports.swipe = function (driver, currentPlatform, direction) {
  switch (direction) {
    case 'left':
      if (currentPlatform == 'Android') {
        (new wd.TouchAction(driver)).longPress({ x: 312, y: 1174 }).moveTo({ x: 700, y: 12 }).release().perform();
        driver.sleep(5000);
        return;
      } else {
        return (new wd.TouchAction(driver)).press({ x: 1192, y: 800 }).moveTo({ x: 700, y: 700 }).release().perform();


      }
      break;
    case 'right':
      if (currentPlatform == 'Android') {
        (new wd.TouchAction(driver)).longPress({ x: 900, y: 1267 }).moveTo({ x: 259, y: 1267 }).release().perform();
        driver.sleep(3000);
        return;
      } else {
        return (new wd.TouchAction(driver)).press({ x: 800, y: 1192 }).moveTo({ x: 259, y: 1132 }).release().perform();

      }
      break;
    case 'up':
      if (currentPlatform == 'Android') {
        (new wd.TouchAction(driver)).longPress({ x: 366, y: 310 }).moveTo({ x: 366, y: 600 }).release().perform();
        driver.sleep(5000);
        return;
      } else {
        return (new wd.TouchAction(driver)).press({ x: 179, y: 108 }).moveTo({ x: -2, y: 266 }).release().perform();
      }
      break;
    case 'down':
      if (currentPlatform == 'Android') {
        return (new wd.TouchAction(driver)).longPress({ x: 351, y: 926 }).moveTo({ x: 351, y: 500 }).release().perform();
      } else {
        return (new wd.TouchAction(driver)).longPress({ x: 179, y: 509 }).moveTo({ x: -8, y: -60 }).release().perform();
      }
      break;
  }
}

exports.tapYesRemoveTargetBtn = function (driver) {
  var tapAction = new wd.TouchAction();
  tapAction
    .tap({ x: 247, y: 390 })
  return driver.performTouchAction(tapAction);
}

exports.tapDoneTargetButton = function (driver) {
  var touchAction = new wd.TouchAction();
  touchAction
    .tap({ x: 185, y: 390 })
  return driver.performTouchAction(touchAction);
}

exports.getAllTextByListOfIds = function (driver, idArray) {
  return Q.Promise(function (resolve) {
    async.map(idArray, function (id, callback) {
      driver.elementById(id).text().then(function (text) {
        callback(null, text.replace("\n", " "));
      });
    }, function (err, results) {
      resolve(results);
    });
  });
};

exports.pullToRefresh = function (driver) {
  var opts = { startX: 0.5, startY: 0.75, endX: 0.5, endY: 0.3, duration: 1 };
  return this.swipe(driver, opts);
};

exports.getTextById = function (driver, id) {
  var deferred = Q.defer();
  driver.elementById(id).text().then(function (text) {
    deferred.resolve(text.replace("\n", " ").replace('. Editing.', ''));
  }, function (err) {
    deferred.resolve(err);
  });
  return deferred.promise;
};

exports.pressHardwareBack = function (driver) {
  return driver.back();
};

exports.pressBackButtonOnPage = function (driver) {
  return driver.elementByClassName('android.widget.ImageButton').click();
};

function promiseWhile(condition, body) {
  var deferred = Q.defer();

  function loop() {
    if (!condition()) return deferred.resolve();
    Q.when(body(), loop, deferred.reject);
  }

  Q.nextTick(loop);

  return deferred.promise;
}

exports.waitForTextToAppear = function (driver, id, text) {
  var deferred = Q.defer();
  var currentMessage = "";
  promiseWhile(function () { return currentMessage !== text; },
    function () {
      var done = Q.defer();
      driver.waitForElementById(id, 2000, 1000).text().then(function (text) {
        currentMessage = text;
        done.resolve();
      });
      return done.promise;
    }).then(function () {
      deferred.resolve();
    }, function (err) {
      console.log(err);
      deferred.resolve(err);
    });
  return deferred.promise;
};

exports.pressOKBtn = function (driver) {
  return driver.elementById('android:id/button1').click();
};

exports.pressCancelBtn = function (driver) {
  return driver.elementById('android:id/button2').click();
};

exports.longPressElement = function (driver, element) {
  element.getSize().then(function (size) {
    var elementWidthBy2 = size.width / 2;
    var elementHeightBy2 = size.height / 2;
    element.getLocation().then(function (location) {
      var elementX = location.x;
      var elementY = location.y;
      var xCoordinate = elementX + elementWidthBy2;
      var yCoordinate = elementY + elementHeightBy2;
      (new wd.TouchAction(driver))
        .longPress({ x: xCoordinate, y: yCoordinate })
        .perform();
      return;
    })
  })
};

exports.waitForElementToBeEnabled = new Asserter(
  function (el) {
    return el.isEnabled().should.eventually.be.true
      .catch(tagChaiAssertionError);
  });

exports.tapWithCoordinates = function (driver, xCoord, yCoord) {
  (new wd.TouchAction(driver))
    .tap({ x: xCoord, y: yCoord })
    .perform()
}

exports.getElement = function (platform, locatorValue) {
  let lvalue = elements[platform.toLowerCase()][locatorValue] || elements['common'][locatorValue];
  return lvalue;
}

exports.tap = function (driver, platform, locatorType, locatorValue) {
  return this.waitForElementToAppear(driver, locatorType, this.getElement(platform, locatorValue)).click();
}

exports.enterText = function (driver, platform, textToEnter, locatorType, locatorValue) {
  return this.waitForElementToAppear(driver, locatorType, this.getElement(platform, locatorValue)).type(textToEnter)
}

// exports.getTextFromElement = function (element, attribute) {
//   var message = element.getAttribute(attribute);
//   return message;
// }

exports.waitForElementToAppear = function (driver, option, value) {
  switch (option) {
    case 'Id': return driver.waitForElementById(value, 25000, 2000).then(function (element) {
      return element;
    })
      break;
    case 'AccessibilityId': return driver.waitForElementByAccessibilityId(value, 25000, 2000).then(function (element) {
      return element;
    })
      break;

    case 'XPath': return driver.waitForElementByXPath(value, 25000, 2000).then(function (element) {
      return element;
    })
      break;
  }
}

exports.getTextFromElement = function (driver, option, value) {
  switch (option) {
    case 'Id':
      return driver.waitForElementById(value, 25000, 2000).then(function (element) {
        return element.text();
      });
    case 'AccessibilityId':
      return driver.waitForElementByAccessibilityId(value, 25000, 2000).then(function (element) {
        return element.text();
      });
    case 'XPath':
      return driver.waitForElementByXPath(value, 25000, 2000).then(function (element) {
        return element.text();
      });
    default:
      console.log('Option not supported to get text of element: ' + option);
  }
}

exports.getListOfElements = function (driver, option, value) {
  switch (option) {
    case 'Id':
      return driver.elementsById(value).then(function (elementList) {
        return elementList;
      });
    case 'AccessibilityId':
      return driver.elementsByAccessibilityId(value).then(function (elementList) {
        return elementList;
      });
    case 'XPath':
      return driver.elementsByXPath(value).then(function (elementList) {
        return elementList;
      });
    default:
      console.log('Option not supported to get text of element: ' + option);
  }
}

exports.dynamicTapWithCoordinates = function (element, driver) {
  element.getSize().then(function (size) {
    var elementWidthBy2 = size.width / 2;
    var elementHeightBy2 = size.height / 2;
    element.getLocation().then(function (location) {
      var elementX = location.x;
      var elementY = location.y;
      var xCoordinate = elementX + elementWidthBy2;
      var yCoordinate = elementY + elementHeightBy2;
      (new wd.TouchAction(driver))
        .tap({ x: xCoordinate, y: yCoordinate })
        .perform();
      return;
    })
  })
};

exports.dynamicTapOnScrollPicker = function (element, driver) {
  element.getSize().then(function (size) {
    var elementWidthBy2 = size.width / 2;
    var elementHeightBy2 = size.height / 2;
    element.getLocation().then(function (location) {
      var elementX = location.x;
      var elementY = location.y;
      var xCoordinate = elementX + elementWidthBy2;
      var yCoordinate = elementY + elementHeightBy2 + 40;
      (new wd.TouchAction(driver))
        .tap({ x: xCoordinate, y: yCoordinate })
        .perform();
      return;
    })
  })
};

exports.dynamicTapOnValueConfirmation = function (element, driver) {
  element.getSize().then(function (size) {
    var elementWidth = size.width - 100;
    var elementHeightBy2 = size.height / 2;
    element.getLocation().then(function (location) {
      // var elementX = location.x;
      var elementY = location.y;
      //var xCoordinate = elementX + elementWidthBy2;
      var yCoordinate = elementY + elementHeightBy2;
      (new wd.TouchAction(driver))
        .tap({ x: elementWidth, y: yCoordinate })
        .perform();
      return;
    })
  })
};

exports.scrollScreen = async function (driver, currentPlatform, direction) {
  if (currentPlatform == 'Android') {
    const layout = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout";
    let element = await driver.elementByXPath(layout);
    let size = await element.getSize();
    let screenWidth = size.width;
    let screenHeight = size.height;
    switch (direction) {
      case 'left':
        return await (new wd.TouchAction(driver))
          .longPress({ x: Math.trunc(screenWidth * 0.1), y: Math.trunc(screenHeight / 2.1) })
          .moveTo({ x: Math.trunc(screenWidth * 0.9), y: Math.trunc(screenHeight / 2.1) })
          .release()
          .perform();
      case 'right':
        return await (new wd.TouchAction(driver))
          .longPress({ x: Math.trunc(screenWidth * 0.9), y: Math.trunc(screenHeight / 2.1) })
          .moveTo({ x: Math.trunc(screenWidth * 0.1), y: Math.trunc(screenHeight / 2.1) })
          .release()
          .perform();
      case 'up':
        return await (new wd.TouchAction(driver))
          .longPress({ x: Math.trunc(screenWidth / 2.1), y: Math.trunc(screenHeight * 0.18) })
          .moveTo({ x: Math.trunc(screenWidth / 2.1), y: Math.trunc(screenHeight * 0.85) })
          .release()
          .perform();
      case 'down':
        return await (new wd.TouchAction(driver))
          .longPress({ x: Math.trunc(screenWidth / 2.1), y: Math.trunc(screenHeight * 0.69) })
          .moveTo({ x: Math.trunc(screenWidth / 2.1), y: Math.trunc(screenHeight * 0.18) })
          .release()
          .perform();
    }
  } else {
    return await driver.execute('mobile: scroll', { direction: direction })
  }
};

exports.isElementPresent = async function (driver, option, locator) {
  switch (option) {
    case 'AccessibilityId': return await driver.hasElementByAccessibilityId(locator).then(function (flag, error) {
      return flag;
    });
      break;
    case 'XPath': return await driver.hasElementByXPath(locator).then(function (flag, error) {
      return flag;
    });
      break;
    case 'Id': return await driver.hasElementById(locator).then(function (flag, error) {
      return flag;
    });
      break;
  }
};

exports.isElementDisplayed = async function (driver, option, locator) {
  if (await this.isElementPresent(driver, option, locator)) {
    switch (option) {
      case 'AccessibilityId':
        return await driver.elementByAccessibilityId(locator).isDisplayed();
      case 'XPath':
        return await driver.elementByXPath(locator).isDisplayed();
      case 'Id':
        return await driver.elementById(locator).isDisplayed();
    }
  } else {
    return false;
  }
};

exports.isElementEnabled = async function (driver, option, locator) {
  if (await this.isElementPresent(driver, option, locator)) {
    switch (option) {
      case 'AccessibilityId':
        return await driver.elementByAccessibilityId(locator).isEnabled();
      case 'XPath':
        return await driver.elementByXPath(locator).isEnabled();
      case 'Id':
        return await driver.elementById(locator).isEnabled();
    }
  } else {
    return false;
  }
};

exports.switchToFrame = async function (driver) {
  //if (await this.isElementPresent(driver, option, frameLocator)) {
  console.log(" frame present");
  let contexts = await driver.contexts();
  // .contexts().then(function (contexts) { // get list of available views. Returns array: ["NATIVE_APP","WEBVIEW_1"]
  //   return driver.context(contexts[1]); // choose the webview context
  // })

  // do some web testing
  //.elementsByCss('.green_button').click()

  //.context('NATIVE_APP') // leave webview context

  // do more native stuff here if we want

  //.quit()
  console.log(" frame switchewd" + contexts[1]);
  driver.context(contexts[1]);
  //}
}

exports.switchToDefaultContent = async function (driver) {
  await driver.switchTo().defaultContent();
};

exports.hideKeyboardAndroid = async function (driver) {
  try {
    return await driver.hideKeyboard();
  }
  catch (err) {
    return;
  }
};

exports.scrollByElements = async function (driver, fromElement, toElement) {
  return await (new wd.TouchAction(driver))
    .longPress({ el: fromElement })
    .moveTo({ el: toElement })
    .release()
    .perform();
};


exports.getCoordinateToSwipe = async function (element, coordinate) {
  let xCoordinate;
  let yCoordinate;
  let elementWidthBy2;
  let elementHeightBy2;

  await element.getSize().then(function (size) {
    elementWidthBy2 = size.width / 2;
    elementHeightBy2 = size.height / 2;
  })

  await element.getLocation().then(function (location) {
    let elementX = location.x;
    let elementY = location.y;
    xCoordinate = elementX + elementWidthBy2;
    yCoordinate = elementY + elementHeightBy2 + 40;
  })

  switch (coordinate.toLowerCase()) {
    case 'x':
      return xCoordinate;
      break;
    case 'y':
      return yCoordinate;
      break;
    default:
      console.log(coordinate + ' : is not a valid co-ordinate');
  }
};


exports.swipeByCoordinates = async function (driver, element, direction) {
  let xCoordinate = await this.getCoordinateToSwipe(element, 'x');
  let yCoordinate = await this.getCoordinateToSwipe(element, 'y');

  switch (direction.toLowerCase()) {
    case 'right':
      await (new wd.TouchAction(driver)).longPress({ x: xCoordinate, y: yCoordinate }).moveTo({ x: (xCoordinate - 300), y: yCoordinate }).release().perform();
      await driver.sleep(3000);
      return;
      break;
    case 'left':
      await (new wd.TouchAction(driver)).longPress({ x: xCoordinate, y: yCoordinate }).moveTo({ x: (xCoordinate + 300), y: yCoordinate }).release().perform();
      await driver.sleep(3000);
      return;
      break;
    case 'down':
      await (new wd.TouchAction(driver)).longPress({ x: xCoordinate, y: yCoordinate }).moveTo({ x: xCoordinate, y: yCoordinate + 500 }).release().perform();
      await driver.sleep(3000);
      return;
      break;
    case 'up':
      await (new wd.TouchAction(driver)).longPress({ x: xCoordinate, y: yCoordinate }).moveTo({ x: xCoordinate, y: 0 }).release().perform();
      await driver.sleep(3000);
      return;
      break;
  }
};