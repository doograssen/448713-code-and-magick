'use strict';

var STAT_X0 = 100;
var STAT_Y0 = 10;
var STAT_HEIGHT = 270;
var STAT_WIDTH = 420;
var STAT_MESSAGE = 'Ура вы победили!';
var STAT_CAPTION = 'Список результатов:';
var MAX_COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var BOUND_INDENT = 50;
var COLUMN_INDENT = 50;
var DEFAULT_STAT_COLOR = 'rgba(255, 0, 0, 1)';
var FIELD_COLOR = '#ffffff';
var TEXT_COLOR = '#000000';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var STAT_FLOOR = 245;
var FONT_SIZE = 16;

var renderStatistics = function (ctx, names, times) {

  var showCenterText = function (x, y, space, text, above) {
    var posX = x + space / 2;
    var posY = above ? y - FONT_SIZE * 1.2 : y + FONT_SIZE * 1.2;
    ctx.font = FONT_SIZE + 'px Verdana';
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(text, posX, posY);
  };

  var drawField = function () {
    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(STAT_X0 + 10, STAT_Y0 + 10, STAT_WIDTH, STAT_HEIGHT);
    ctx.fillStyle = FIELD_COLOR;
    ctx.fillRect(STAT_X0, STAT_Y0, STAT_WIDTH, STAT_HEIGHT);
    showCenterText(STAT_X0, STAT_Y0, STAT_WIDTH, STAT_MESSAGE, 0);
    showCenterText(STAT_X0, STAT_Y0 + FONT_SIZE * 1.5, STAT_WIDTH, STAT_CAPTION, 0);
  };

  var drawStat = function () {
    var length = times.length;
    var scale = MAX_COLUMN_HEIGHT / Math.max.apply(null, times);
    var columnX0 = STAT_X0 + BOUND_INDENT;
    var columnY0;
    var columnHeight;

    var randomValue = function (max, min) {
      return (Math.random() * (max - min)) + min;
    };

    var randomBlueColor = function () {
      return 'hsl(240,' + randomValue(75, 25) + '%, ' + randomValue(75, 25) + '% )';
    };

    for (var i = 0; i < length; i++) {
      columnHeight = Math.round(scale * times[i]);
      columnY0 = STAT_FLOOR - Math.round(scale * times[i]);
      ctx.fillStyle = (names[i] === 'Вы') ? DEFAULT_STAT_COLOR : randomBlueColor();
      ctx.fillRect(columnX0, columnY0, COLUMN_WIDTH, columnHeight);
      ctx.fillStyle = '#000000';
      showCenterText(columnX0, columnY0, COLUMN_WIDTH, names[i], 1);
      showCenterText(columnX0, STAT_FLOOR, COLUMN_WIDTH, Math.round(times[i]), 0);
      columnX0 += (COLUMN_WIDTH + COLUMN_INDENT);
    }
  };
  
  drawField();
  drawStat();
};
