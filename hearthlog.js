var $ = require('jquery');
var HSLogWatcher = require('hearthstone-log-watcher');
var logWatcher = new HSLogWatcher();
var remote = require('electron').remote;
var db = remote.getGlobal('db');

logWatcher.on('game-over', function (players) {
  db.run("INSERT INTO games (friendly, opposing, result) VALUES ('" + players[0].name + "', '" + players[1].name + "', '" + players[0].status + "');");
});

$(document).ready(function() {
  var $status = $('#status');

  $status.on('click', function (event) {
    event.preventDefault();

    var status = $status.data('status');
    var statusName = status == 'Started' ? 'Stopped' : 'Started';
    var statusColor = status == 'Started' ? 'red' : 'green';
    $status.data('status', statusName);
    $status.attr('src', 'https://img.shields.io/badge/Hearthlog-' + statusName + '-' + statusColor + '.svg');

    if (statusName == 'Started') {
      logWatcher.start();
    }
    else {
      logWatcher.stop();
    }

    console.log(db);
  });
});
