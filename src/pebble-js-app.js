function getStorageValue(item, default_value){
    var retVal = localStorage.getItem(item);
    //console.log('value' + item + ': ' + String(retVal));
    if (retVal === null || retVal == 'undefined' || retVal == 'null'){
        retVal = default_value;
    }
    return retVal;
}

Pebble.addEventListener('showConfiguration', function(e) {
  // http://developer.getpebble.com/tools/color-picker/
  var background_color = getStorageValue('background_color', '000000'); // GColorBlack
  var time_color = getStorageValue('time_color', 'FFFFFF'); // GColorWhite
  var vibrate_disconnect_str = 'off';
  var vibrate_disconnect = getStorageValue('vibrate_disconnect', 0);
  if (vibrate_disconnect == 1)
  {
      vibrate_disconnect_str = 'on';
  }
  else
  {
      vibrate_disconnect_str = 'off';
  }

  var URL = 'http://clach04.github.io/pebble/watchface_framework/slate/index.html' +
      '?' +
      'background_color=' + encodeURIComponent(background_color) + '&' +
      'time_color=' + encodeURIComponent(time_color) + '&' +
      'vibrate_disconnect=' + encodeURIComponent(vibrate_disconnect);
  console.log('Configuration window opened. ' + URL);
  Pebble.openURL(URL);
});

Pebble.addEventListener('webviewclosed',
    function(e) {
        console.log('e.response: ' + e.response);
        console.log('e.response.length: ' + e.response.length);
        try {
            var configuration = JSON.parse(decodeURIComponent(e.response));
            var vibrate_disconnect = 0;

            console.log('dictionary to validate ' + JSON.stringify(configuration));

            if ('vibrate_disconnect' in configuration)
            {
                switch (configuration.vibrate_disconnect) {
                    case true:
                    case 'true':
                    case 'True':
                    case 'TRUE':
                    case 1:
                    case '1':
                    case 'on':
                        vibrate_disconnect = 1;
                        break;
                    default:
                        vibrate_disconnect = 0;
                        break;
                }
            }
            var dictionary = {
              "KEY_TIME_COLOR": parseInt(configuration.time_color, 16),
              "KEY_BACKGROUND_COLOR": parseInt(configuration.background_color, 16), // FIXME if mising default value..
              "KEY_VIBRATE_ON_DISCONNECT": vibrate_disconnect
            };
            console.log('background_color ' + configuration.background_color);
            localStorage.setItem('background_color', configuration.background_color);
            console.log('time_color ' + configuration.time_color);
            localStorage.setItem('time_color', configuration.time_color);
            console.log('vibrate_disconnect ' + configuration.vibrate_disconnect);
            localStorage.setItem('vibrate_disconnect', configuration.vibrate_disconnect);
            console.log('dictionary to send ' + JSON.stringify(dictionary));
            // Send to Pebble
            Pebble.sendAppMessage(dictionary,
                function(e) {
                    console.log("Configuration sent to Pebble successfully!");
                },
                function(e) {
                    console.log("Error sending configuration info to Pebble!");
                }
            );
        } catch (ex) {
            // If we have SyntaxError JSON is invalid, anything unknown!?
            if (ex instanceof SyntaxError) {
                console.log('Probably Cancelled');
            } else {
                throw ex;
                // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
            }
        }
    }
);
