const create = () => {
  fromEdge = 1200;
  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;

  var circle0 = game.add.graphics(0, 0);

  circle0.lineStyle(2, 0x333333, 1);
  circle0.drawCircle(game.world.centerX, game.world.centerY, 175);

  var circle1 = game.add.graphics(0, 0);

  circle1.lineStyle(2, 0x333333, 1);
  circle1.drawCircle(game.world.centerX, game.world.centerY, 450);

  var circle2 = game.add.graphics(0, 0);

  circle2.lineStyle(2, 0x333333, 1);
  circle2.drawCircle(game.world.centerX, game.world.centerY, 800);

  var circle3 = game.add.graphics(0, 0);

  circle3.lineStyle(2, 0x333333, 1);
  circle3.drawCircle(game.world.centerX, game.world.centerY, 1250);

  station = game.add.sprite(game.world.centerX - 62, game.world.centerY - 175, 'station');

  alienPinkPort = game.add.sprite(fromEdge, game.world.centerY - 173.5, 'alienPinkLogo');
  alienYellowPort = game.add.sprite(fromEdge, game.world.centerY - 98.5, 'alienYellowLogo');
  alienGreenPort = game.add.sprite(fromEdge, game.world.centerY - 23.5, 'alienGreenLogo');
  alienBluePort = game.add.sprite(fromEdge, game.world.centerY + 51.5, 'alienBlueLogo');
  alienBeigePort = game.add.sprite(fromEdge, game.world.centerY + 126.5, 'alienBeigeLogo');
  game.stage.backgroundColor = "#111111";
  //game.physics.enable(alienGreen, Phaser.Physics.ARCADE);

  //aliens in space
  alienPink = game.add.sprite(100, 100, 'alienPink');
  alienPink.visible = false;
  alienPink.anchor.x = 0.5;
  alienPink.anchor.y = 0.5;

  alienYellow = game.add.sprite(100, 100, 'alienYellow');
  alienYellow.visible = false;

  alienGreen = game.add.sprite(100, 100, 'alienGreen');
  alienGreen.visible = false;

  alienBlue = game.add.sprite(100, 100, 'alienBlue');
  alienBlue.visible = false;

  alienBeige = game.add.sprite(100, 100, 'alienBeige');
  alienBeige.visible = false;

  //aliens at port
  alienPinkPort.inputEnabled = true;
  alienPinkPort.input.useHandCursor = true;
  alienPinkPort.events.onInputDown.add(() => generateSprite(alienPink, pinkVoice), this);

  alienYellowPort.inputEnabled = true;
  alienYellowPort.input.useHandCursor = true;
  alienYellowPort.events.onInputDown.add(() => generateSprite(alienYellow, yellowVoice), this);

  alienGreenPort.inputEnabled = true;
  alienGreenPort.input.useHandCursor = true;
  alienGreenPort.events.onInputDown.add(() => generateSprite(alienGreen, greenVoice), this);

  alienBluePort.inputEnabled = true;
  alienBluePort.input.useHandCursor = true;
  alienBluePort.events.onInputDown.add(() => generateSprite(alienBlue, yellowVoice), this);

  alienBeigePort.inputEnabled = true;
  alienBeigePort.input.useHandCursor = true;
  alienBeigePort.events.onInputDown.add(() => generateSprite(alienBeige, yellowVoice), this);

  //alien dragging
  alienPink.inputEnabled = true;
  alienPink.input.enableDrag(true);

  alienYellow.inputEnabled = true;
  alienYellow.input.enableDrag(true);

  alienGreen.inputEnabled = true;
  alienGreen.input.enableDrag(true);

  alienBlue.inputEnabled = true;
  alienBlue.input.enableDrag(true);

  alienBeige.inputEnabled = true;
  alienBeige.input.enableDrag(true);

  // var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

  //   // set a fill and line style
  //   graphics.beginFill(0xFF3300);
  //   graphics.lineStyle(2, 0xFFFFFF, 1);

  //   // draw a shape
  //   //graphics.moveTo(game.world.centerX, game.world.centerY);
  //   graphics.lineTo(alienPink.x - game.world.centerX, alienPink.y - game.world.centerY);
  //   graphics.endFill();

  //   station.bringToTop();
  //   alienPink.bringToTop();

  Tone.Transport.start('+0.1')
}

export
