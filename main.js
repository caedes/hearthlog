(function () {
  'use strict';

  const electron = require('electron');
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;
  const Sequelize = require('sequelize');
  global.sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: 'db/hearthlog.sqlite'
  });

  var Game = sequelize.define('Game', {
    friendly: Sequelize.STRING,
    opposing: Sequelize.STRING,
    result: Sequelize.STRING,
    createdAt: Sequelize.DATE
  });

  let mainWindow;

  function createWindow () {
    mainWindow = new BrowserWindow({width: 320, height: 240});

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
      mainWindow = null;
    });
  }

  app.on('ready', createWindow);

  app.on('window-all-closed', function () {
    app.quit();
    global.db.close();
  });
}());
