// Position: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Examples
// Cursor Capture
// check pointerLock support
var havePointerLock = 'pointerLockElement' in document ||
  'mozPointerLockElement' in document ||
  'webkitPointerLockElement' in document;

// element for pointerLock
var requestedElement = document.getElementById('screen');

// prefixes
requestedElement.requestPointerLock = requestedElement.requestPointerLock || requestedElement.mozRequestPointerLock || requestedElement.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
  document.mozExitPointerLock ||
  document.webkitExitPointerLock;

var x;
var y;

var isLocked = function() {
  return requestedElement === document.pointerLockElement ||
    requestedElement === document.mozPointerLockElement ||
    requestedElement === document.webkitPointerLockElement;
}

requestedElement.addEventListener('click', function() {
  if (!isLocked()) {
    x = 0;
    y = 0;
    requestedElement.requestPointerLock();
  }
  // else {
  //   document.exitPointerLock();
  // }
}, false);

var moveCallback = function(e) {
  var position = document.getElementById("position");

    x += e.movementX ||
    e.mozMovementX ||
    e.webkitMovementX ||
    0;

    y -= e.movementY ||
    e.mozMovementY ||
    e.webkitMovementY ||
    0;

    var a = e.clientX
    var b = e.clientY

  position.innerHTML = 'Position X: ' + x + '<br />Position Y: ' + y + '<br />Initial X Window Position : ' + a + '<br />Initial Y Window Position : ' + b;
}

var changeCallback = function() {
  if (!havePointerLock) {
    alert('Unable to Lock Pointer');
    return;
  }
  if (isLocked()) {
    document.addEventListener("mousemove", moveCallback, false);
    document.body.classList.add('locked');
  }

  else {
    document.removeEventListener("mousemove", moveCallback, false);
    document.body.classList.remove('locked');
  }
}

document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

// Click
function WhichButton(event) {
    document.getElementById("demo").innerHTML = "You pressed button: " + event.button;
}