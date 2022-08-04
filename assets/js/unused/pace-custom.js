paceOptions = {
    ajax: false, // disabled
    document: false, // disabled
    eventLag: false, // disabled
    restartOnPushState: false,
    restartOnRequestAfter: false
  };

  Pace.options.ajax.trackWebSockets = false;

  document.onload = funtion(){Pace.stop};