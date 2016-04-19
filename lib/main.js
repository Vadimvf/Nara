/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(3);
	
	var _gameView = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function (e) {
	
	  var background = document.getElementById('nara-background');
	  var middleground = document.getElementById('nara-middleground');
	  var foreground = document.getElementById('nara-foreground');
	  var totalWidth = background.clientWidth;
	  var totalHeight = background.clientHeight;
	  var playerWidth = foreground.clientWidth;
	  var playerHeight = foreground.clientHeight;
	  var dim = [playerWidth, playerHeight];
	  var totalDim = [totalWidth, totalHeight];
	  var ctx = foreground.getContext("2d");
	  var healthBarCtx = middleground.getContext("2d");
	  var Nara = window.Nara || {};
	  var startButton = document.getElementsByClassName('right-size')[0];
	  var startModal = document.getElementsByClassName('modal-container')[0];
	  var lostModal = document.getElementsByClassName('modal-lost')[0];
	
	  background.width = totalWidth;
	  background.height = totalHeight;
	  middleground.width = totalWidth;
	  middleground.height = totalHeight;
	  foreground.width = playerWidth;
	  foreground.height = playerHeight;
	
	  var startGame = function startGame() {
	    startModal.className = "hidden";
	    (0, _gameView.run)(ctx, totalDim);
	    _game.Game.reset(ctx, totalDim);
	    _game.Game.createElements(dim, healthBarCtx, totalDim);
	    setLostCall(animation, lostModal);
	  };
	
	  _game.Game.createElements(dim, healthBarCtx, totalDim);
	  var animation = (0, _gameView.start)(ctx, dim);
	  startButton.addEventListener("click", startGame);
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.run = exports.stop = exports.start = undefined;
	
	var _game = __webpack_require__(3);
	
	var shouldGameRun = true;
	var lostModal = void 0;
	
	function start(ctx, dim) {
	  _game.Game.draw(ctx, dim);
	  _game.Game.moveObjects(ctx, dim);
	  var gameAnimationId = void 0;
	
	  if (shouldGameRun === true) {
	    gameAnimationId = requestAnimationFrame(function () {
	      return start(ctx, dim);
	    });
	  }
	};
	
	function run() {
	  shouldGameRun = true;
	};
	
	function stop(finalScore) {
	  shouldGameRun = false;
	};
	
	exports.start = start;
	exports.stop = stop;
	exports.run = run;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Game = undefined;
	
	var _enemy = __webpack_require__(4);
	
	var _enemyTypeA = __webpack_require__(6);
	
	var _enemyTypeB = __webpack_require__(7);
	
	var _enemyTypeC = __webpack_require__(8);
	
	var _enemyGeneration = __webpack_require__(9);
	
	var _playerShip = __webpack_require__(10);
	
	var Game = {
	  GAME_CONSTANTS: {
	    NUM_ENEMIES: 10
	  },
	
	  ships: {},
	  bullets: [],
	  playerBullets: [],
	  toDelete: [],
	  ship: {},
	  healthBar: {},
	
	  createElements: function createElements(dim, healthBarCtx, totalDim) {
	    var _randomPos = function _randomPos() {
	      return [Math.floor(Math.random() * dim[0]), Math.floor(Math.random() * dim[1])];
	    };
	    var NUM_ENEMIES = Game.GAME_CONSTANTS.NUM_ENEMIES;
	
	
	    Game.ship = new _playerShip.Ship(dim, healthBarCtx, totalDim);
	    Game.healthBar = Game.ship.healthBar;
	  },
	
	  reset: function reset(ctx, dim) {
	    var ships = Game.ships;
	    var bullets = Game.bullets;
	    var playerBullets = Game.playerBullets;
	    var ship = Game.ship;
	    var healthBar = Game.healthBar;
	    var toDelete = Game.toDelete;
	
	    Game.ships = {}, Game.bullets = [], Game.playerBullets = [], Game.toDelete = [], Game.ship = {}, Game.healthBar = {}, ctx.clearRect(0, 0, dim[0], dim[1]);
	    console.log('reset');
	  },
	
	  draw: function draw(ctx, dim) {
	    var _waves = [_enemyGeneration.enemyGeneration.WAVE_A, _enemyGeneration.enemyGeneration.WAVE_B, _enemyGeneration.enemyGeneration.WAVE_C, _enemyGeneration.enemyGeneration.WAVE_D, _enemyGeneration.enemyGeneration.WAVE_E];
	
	    function _checkShips() {
	      for (var key in Game.ships) {
	        if (Game.ships.hasOwnProperty(key)) {
	          return false;
	        }
	      }
	      return true;
	    }
	
	    ctx.clearRect(0, 0, dim[0], dim[1]);
	    if (!_enemyGeneration.enemyGeneration.generating && _checkShips()) {
	      _waves[Math.floor(Math.random() * 5)]();
	    }
	
	    Game.ship.draw(ctx);
	    Game.ship.healthBar.draw();
	
	    for (var key in Game.ships) {
	      Game.ships[key].draw(ctx);
	    }
	
	    Game.bullets.forEach(function (bullet, idx) {
	      return bullet.draw(ctx);
	    });
	    Game.playerBullets.forEach(function (bullet, idx) {
	      return bullet.draw(ctx);
	    });
	  },
	
	  moveObjects: function moveObjects(ctx, dim) {
	
	    for (var key in Game.ships) {
	      var enemy = Game.ships[key];
	      Game._checkCollision(enemy, key);
	      Game._checkPlayerBulletCollision(enemy, key);
	      if (enemy.pos[1] > dim[1] || enemy.pos[1] < -20) {
	        delete Game.ships[key];
	        continue;
	      }
	      enemy.move();
	    }
	
	    for (var i = 0; i < Game.bullets.length; i++) {
	      if (Game._checkBulletCollision(Game.bullets[i], i)) {
	        continue;
	      }
	      if (Game.bullets[i].pos[1] > dim[1]) {
	        Game.bullets.splice(i, 1);
	        continue;
	      }
	      Game.bullets[i].move();
	    }
	
	    for (var _i = 0; _i < Game.playerBullets.length; _i++) {
	
	      if (Game.playerBullets[_i].pos[1] > dim[1]) {
	        Game.playerBullets.splice(_i, 1);
	        continue;
	      }
	      Game.playerBullets[_i].move();
	    }
	
	    Game.ship.move();
	  },
	
	  _checkCollision: function _checkCollision(enemy, key) {
	    var posShip = Game.ship.pos;
	    var enemyPos = enemy.pos;
	    var dx = posShip[0] - enemyPos[0];
	    var dy = posShip[1] - enemyPos[1];
	    var dist = Math.sqrt(dx * dx + dy * dy);
	
	    if (dist < Game.ship.rad + enemy.rad) {
	      if (Game.ship.color === enemy.color) {
	        Game.ship.heal();
	        delete Game.ships[key];
	      } else {
	        delete Game.ships[key];
	        Game.ship.hit();
	      }
	    }
	  },
	
	  _checkBulletCollision: function _checkBulletCollision(enemy, idx) {
	    var posShip = Game.ship.pos;
	    var enemyPos = enemy.pos;
	    var dx = posShip[0] - enemyPos[0];
	    var dy = posShip[1] - enemyPos[1];
	    var dist = Math.sqrt(dx * dx + dy * dy);
	
	    if (dist < Game.ship.rad + enemy.rad) {
	      if (Game.ship.color === enemy.color) {
	        Game.ship.heal();
	        Game.bullets.splice(idx, 1);
	        return true;
	      } else {
	        Game.ship.hit();
	        Game.bullets.splice(idx, 1);
	        return true;
	      }
	    }
	  },
	
	  _checkPlayerBulletCollision: function _checkPlayerBulletCollision(enemy, key) {
	    var bullets = Game.playerBullets;
	    var enemyPos = enemy.pos;
	
	    for (var i = 0; i < bullets.length; i++) {
	      var bullet = bullets[i];
	      var dx = bullet.pos[0] - enemyPos[0];
	      var dy = bullet.pos[1] - enemyPos[1];
	      var dist = Math.sqrt(dx * dx + dy * dy);
	      if (dist < bullet.rad + enemy.rad) {
	        if (Game.ship.color === enemy.color) {
	          Game.playerBullets.splice(i, 1);
	          i--;
	          delete Game.ships[key];
	          Game.ship.healthBar.addPoints(10);
	          continue;
	        } else {
	          Game.playerBullets.splice(i, 1);
	          i--;
	          delete Game.ships[key];
	          Game.ship.healthBar.addPoints(10);
	          continue;
	        }
	      }
	    }
	  }
	
	};
	
	exports.Game = Game;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bullet = undefined;
	
	var _movingObject = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BULLET_CONSTANTS = {
	  vel: [0, 3],
	  rad: 5
	};
	
	var Bullet = function (_MovingObject) {
	  _inherits(Bullet, _MovingObject);
	
	  function Bullet(objWithPos) {
	    _classCallCheck(this, Bullet);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bullet).call(this, BULLET_CONSTANTS));
	
	    var pos = objWithPos.pos;
	    var vel = objWithPos.vel;
	    var rad = objWithPos.rad;
	    var color = objWithPos.color;
	
	    _this.pos = pos;
	    _this.color = color;
	    if (vel) {
	      _this.vel = vel;
	    }
	    if (rad) {
	      _this.rad = rad;
	    }
	    return _this;
	  }
	
	  return Bullet;
	}(_movingObject.MovingObject);
	
	exports.Bullet = Bullet;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var COLORS = {
	  WHITE: "#e790e7",
	  BLACK: "#93e4eb"
	};
	
	var _randomColor = function _randomColor() {
	  if (Math.random() < .5) {
	    return COLORS.WHITE;
	  } else {
	    return COLORS.BLACK;
	  }
	};
	
	var MovingObject = function () {
	  function MovingObject(_ref) {
	    var pos = _ref.pos;
	    var vel = _ref.vel;
	    var rad = _ref.rad;
	    var colorOveride = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    _classCallCheck(this, MovingObject);
	
	    this.pos = pos;
	    this.vel = vel;
	    this.rad = rad;
	    this.color = _randomColor();
	    if (colorOveride) {
	      this.color = colorOveride;
	    }
	  }
	
	  _createClass(MovingObject, [{
	    key: "toString",
	    value: function toString() {
	      return "(" + this.pos + ", " + this.vel + ", " + this.rad + ", " + this.color + ")";
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      var color = this.color;
	      var pos = this.pos;
	      var rad = this.rad;
	
	      ctx.fillStyle = color;
	      ctx.beginPath();
	
	      ctx.arc(pos[0], pos[1], rad, 0, 2 * Math.PI, false);
	
	      ctx.fill();
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      var pos = this.pos;
	      var vel = this.vel;
	      this.pos = [pos[0] + vel[0], pos[1] + vel[1]];
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.MovingObject = MovingObject;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EnemyTypeA = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _movingObject = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ENEMY_TYPE_A_CONSTANTS = {
	  rad: 20,
	  vel: [0, 2]
	};
	
	var EnemyTypeA = function (_MovingObject) {
	  _inherits(EnemyTypeA, _MovingObject);
	
	  function EnemyTypeA(color) {
	    _classCallCheck(this, EnemyTypeA);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EnemyTypeA).call(this, ENEMY_TYPE_A_CONSTANTS));
	
	    _this.pos = [Math.floor(Math.random() * 800), -10];
	    _this.dir = Math.random();
	    if (color) {
	      _this.color = color;
	    }
	    return _this;
	  }
	
	  _createClass(EnemyTypeA, [{
	    key: 'move',
	    value: function move() {
	      var pos = this.pos;
	      var vel = this.vel;
	      this.pos = [pos[0] + vel[0], pos[1] + vel[1]];
	      if (pos[1] > 100 && this.dir > .5) {
	        this.vel = [3, 6];
	      }
	      if (pos[1] > 100 && this.dir < .5) {
	        this.vel = [-3, 6];
	      }
	    }
	  }]);
	
	  return EnemyTypeA;
	}(_movingObject.MovingObject);
	
	exports.EnemyTypeA = EnemyTypeA;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EnemyTypeB = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _movingObject = __webpack_require__(5);
	
	var _enemy = __webpack_require__(4);
	
	var _game = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ENEMY_TYPE_B_CONSTANTS = {
	  rad: 15,
	  vel: [0, 3],
	
	  BULLET_VELOCITIES: [[0, 2], [1, 2], [-1, 2]]
	
	};
	
	var EnemyTypeB = function (_MovingObject) {
	  _inherits(EnemyTypeB, _MovingObject);
	
	  function EnemyTypeB() {
	    var isSprayOn = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    var color = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    _classCallCheck(this, EnemyTypeB);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EnemyTypeB).call(this, ENEMY_TYPE_B_CONSTANTS));
	
	    _this.pos = [Math.floor(Math.random() * 800), 0];
	    _this.midPos = [Math.floor(Math.random() * 800), 800];
	    _this.endPos = [Math.floor(Math.random() * 800), 600];
	    _this.counter = 0;
	    _this.isSprayOn = isSprayOn;
	    if (color) {
	      _this.color = color;
	    };
	    return _this;
	  }
	
	  _createClass(EnemyTypeB, [{
	    key: 'move',
	    value: function move() {
	      var pos = this.pos;
	      var vel = this.vel;
	      var goalPos = this.midPos;
	      var diffX = pos[0] - goalPos[0];
	      var diffY = pos[1] - goalPos[1];
	      if (diffX < -20 && this.counter < 10) {
	        this.vel[0] = 3;
	      } else if (diffX > 20 && this.counter < 10) {
	        this.vel[0] = -3;
	      } else {
	        this.vel[0] = 0;
	        this.counter += 1;
	      }
	
	      if (diffY < -20 && this.counter < 10) {
	        this.vel[1] = 3;
	      } else if (diffY > 20 && this.counter < 10) {
	        this.vel[1] = -3;
	      } else {
	        this.vel[1] = -3;
	      }
	
	      if (this.isSprayOn) {
	        if (this.counter > 30) {
	          this.counter = 0;
	        }
	      }
	
	      if (this.counter === 3) {
	        this._fire(3);
	        this.counter += 1;
	      }
	
	      this.pos = [pos[0] + vel[0], pos[1] + vel[1]];
	    }
	  }, {
	    key: '_fire',
	    value: function _fire(numBullets) {
	      for (var i = 0; i < numBullets; i++) {
	        _game.Game.bullets.push(new _enemy.Bullet({
	          color: this.color,
	          vel: ENEMY_TYPE_B_CONSTANTS.BULLET_VELOCITIES[i],
	          pos: this.pos
	        }));
	      }
	    }
	  }]);
	
	  return EnemyTypeB;
	}(_movingObject.MovingObject);
	
	exports.EnemyTypeB = EnemyTypeB;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EnemyTypeC = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _movingObject = __webpack_require__(5);
	
	var _enemy = __webpack_require__(4);
	
	var _game = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ENEMY_TYPE_B_CONSTANTS = {
	  rad: 15,
	  vel: [0, 3],
	
	  BULLET_VELOCITIES: [[0, 2], [1, 2], [-1, 2]]
	};
	
	var EnemyTypeC = function (_MovingObject) {
	  _inherits(EnemyTypeC, _MovingObject);
	
	  function EnemyTypeC() {
	    var isSprayOn = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	    _classCallCheck(this, EnemyTypeC);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EnemyTypeC).call(this, ENEMY_TYPE_B_CONSTANTS));
	
	    _this.pos = [Math.floor(Math.random() * 800), 0];
	    _this.midPos = [Math.floor(Math.random() * 800), Math.floor(Math.random() * 300 + 400)];
	    _this.counter = 0;
	    _this.isSprayOn = isSprayOn;
	    return _this;
	  }
	
	  _createClass(EnemyTypeC, [{
	    key: 'move',
	    value: function move() {
	      var pos = this.pos;
	      var vel = this.vel;
	      var goalPos = this.midPos;
	      var diffX = pos[0] - goalPos[0];
	      var diffY = pos[1] - goalPos[1];
	      if (diffX < -20 && !(diffY > 10) && this.counter < 10) {
	        this.vel[0] = 1;
	      } else if (diffX > 20 && !(diffY > 10) && this.counter < 10) {
	        this.vel[0] = -1;
	      } else {
	        this.vel[0] = 0;
	        this.counter += 1;
	      }
	
	      if (diffY < -20 && this.counter < 10) {
	        this.vel[1] = 1;
	      } else if (diffY > 20 && this.counter < 10) {
	        this.vel[1] = -1;
	      } else {
	        this.vel[1] = 8;
	      }
	
	      if (this.isSprayOn) {
	        if (this.counter > 30) {
	          this.counter = 0;
	        }
	      }
	
	      if (this.counter === 3) {
	        this._fire(1);
	        this.counter += 1;
	      }
	
	      this.pos = [pos[0] + vel[0], pos[1] + vel[1]];
	    }
	  }, {
	    key: '_fire',
	    value: function _fire(numBullets) {
	      for (var i = 0; i < numBullets; i++) {
	        _game.Game.bullets.push(new _enemy.Bullet({
	          color: this.color,
	          vel: ENEMY_TYPE_B_CONSTANTS.BULLET_VELOCITIES[i],
	          pos: this.pos
	        }));
	      }
	    }
	  }]);
	
	  return EnemyTypeC;
	}(_movingObject.MovingObject);
	
	exports.EnemyTypeC = EnemyTypeC;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.enemyGeneration = undefined;
	
	var _enemyTypeA = __webpack_require__(6);
	
	var _enemyTypeB = __webpack_require__(7);
	
	var _enemyTypeC = __webpack_require__(8);
	
	var _game = __webpack_require__(3);
	
	var enemyGeneration = {
	  generating: false,
	  numEnemies: 0,
	
	  _reset: function _reset() {
	    enemyGeneration.numEnemies = 0;
	    enemyGeneration.generating = true;
	  },
	
	  _generateSkeleton: function _generateSkeleton(enemyGenerate, numEnemies, spacing) {
	    enemyGeneration._reset();
	    enemyGeneration.interval = setInterval(function () {
	      enemyGenerate();
	
	      if (enemyGeneration.numEnemies === numEnemies) {
	        clearInterval(enemyGeneration.interval);
	        enemyGeneration.numEnemies = 0;
	
	        setTimeout(function () {
	          enemyGeneration.generating = false;
	        }, 5000);
	      }
	    }, spacing);
	  },
	
	  WAVE_A: function WAVE_A() {
	    var color = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	    var _enemyGenerate = function _enemyGenerate() {
	      _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeA.EnemyTypeA(color);
	      enemyGeneration.numEnemies++;
	    };
	
	    enemyGeneration._generateSkeleton(_enemyGenerate, 500, 45);
	  },
	
	  WAVE_B: function WAVE_B() {
	    var _enemyGenerate = function _enemyGenerate() {
	      for (var i = 0; i <= 5; i++) {
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeC.EnemyTypeC();
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeC.EnemyTypeC();
	      }
	      enemyGeneration.numEnemies += 10;
	    };
	
	    enemyGeneration._generateSkeleton(_enemyGenerate, 2000, 50);
	  },
	
	  WAVE_C: function WAVE_C() {
	    var _enemyGenerate = function _enemyGenerate() {
	      for (var i = 0; i <= 5; i++) {
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeC.EnemyTypeC(true);
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeC.EnemyTypeC(true);
	      }
	      enemyGeneration.numEnemies += 10;
	    };
	
	    enemyGeneration._generateSkeleton(_enemyGenerate, 2000, 75);
	  },
	
	  WAVE_D: function WAVE_D() {
	    var color = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	    var _enemyGenerate = function _enemyGenerate() {
	      for (var i = 0; i <= 5; i++) {
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeB.EnemyTypeB(true, color);
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeB.EnemyTypeB(true, color);
	      }
	      enemyGeneration.numEnemies += 10;
	    };
	
	    enemyGeneration._generateSkeleton(_enemyGenerate, 1200, 250);
	  },
	
	  WAVE_E: function WAVE_E() {
	    var _enemyGenerate = function _enemyGenerate() {
	      for (var i = 0; i <= 5; i++) {
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeB.EnemyTypeB();
	        _game.Game.ships[enemyGeneration.numEnemies] = new _enemyTypeB.EnemyTypeB();
	      }
	      enemyGeneration.numEnemies += 10;
	    };
	
	    enemyGeneration._generateSkeleton(_enemyGenerate, 2000, 75);
	  }
	
	};
	
	exports.enemyGeneration = enemyGeneration;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ship = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _movingObject = __webpack_require__(5);
	
	var _enemy = __webpack_require__(4);
	
	var _game = __webpack_require__(3);
	
	var _gameView = __webpack_require__(2);
	
	var _healthBar = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var COLORS = {
	  WHITE: "#e790e7",
	  BLACK: "#93e4eb"
	};
	
	var PLAYER_CONSTANTS = {
	  rad: 15,
	  vel: [0, 0],
	  BULLET_VELOCITIES: [[.5, -10], [-.5, -10], [0, -10]]
	};
	
	var Ship = function (_MovingObject) {
	  _inherits(Ship, _MovingObject);
	
	  function Ship(dim, healthBarCtx, totalDim) {
	    _classCallCheck(this, Ship);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ship).call(this, PLAYER_CONSTANTS));
	
	    _this._keyListeners();
	    _this.pos = [dim[0] * .5, dim[1] - 50];
	    _this.pressedKeys = {};
	    _this.healthBar = new _healthBar.HealthBar(healthBarCtx, totalDim);
	    _this.lastFired = 0;
	    _this.lastColorSwitch = 0;
	    _this.bounds = dim;
	    _this.bullets = 2;
	    return _this;
	  }
	
	  _createClass(Ship, [{
	    key: 'move',
	    value: function move() {
	      var pos = this.pos;
	      var vel = this.vel;
	
	      if (this.pressedKeys['DOWN']) {
	        this.vel[1] = 5;
	      } else if (this.pressedKeys['UP']) {
	        this.vel[1] = -5;
	      } else if (this.vel[1] > 0) {
	        this.vel[1] -= .25;
	      } else if (this.vel[1] < 0) {
	        this.vel[1] += .25;
	      }
	
	      if (this.pressedKeys['RIGHT']) {
	        this.vel[0] = 5;
	      } else if (this.pressedKeys['LEFT']) {
	        this.vel[0] = -5;
	      } else if (this.vel[0] > 0) {
	        this.vel[0] -= .25;
	      } else if (this.vel[0] < 0) {
	        this.vel[0] += .25;
	      }
	
	      var newPos = [pos[0] + vel[0], pos[1] + vel[1]];
	      this._updatePosWithinBounds(newPos);
	
	      if (this.pressedKeys['SPACE']) {
	        this.fire();
	      }
	      if (this.pressedKeys['F']) {
	        this.colorSwitch();
	      }
	      if (this.pressedKeys['D'] && this.healthBar.power > 20) {
	        for (var key in _game.Game.ships) {
	          delete _game.Game.ships[key];
	          this.healthBar.score += 20;
	        }
	        this.healthBar.power -= 20;
	      }
	    }
	  }, {
	    key: 'fire',
	    value: function fire() {
	      var _this2 = this;
	
	      var _initialFire = function _initialFire() {
	        for (var i = 0; i < _this2.bullets; i++) {
	          _game.Game.playerBullets.push(new _enemy.Bullet({
	            color: _this2.color,
	            vel: PLAYER_CONSTANTS.BULLET_VELOCITIES[i],
	            pos: _this2.pos
	          }));
	        }
	        _this2.lastFired = Date.now();
	      };
	
	      if (Date.now() - this.lastFired > 150) {
	        _initialFire();
	      }
	    }
	  }, {
	    key: 'colorSwitch',
	    value: function colorSwitch() {
	      var _this3 = this;
	
	      var _initialSwitch = function _initialSwitch() {
	        if (_this3.color === COLORS.WHITE) {
	          _this3.color = COLORS.BLACK;
	        } else {
	          _this3.color = COLORS.WHITE;
	        }
	        _this3.lastColorSwitch = Date.now();
	      };
	
	      if (Date.now() - this.lastColorSwitch > 200) {
	        _initialSwitch();
	      }
	    }
	  }, {
	    key: 'hit',
	    value: function hit() {
	      this.healthBar.health -= 3;
	      if (this.healthBar.health < 0) {
	        (0, _gameView.stop)(this.healthBar.score);
	      }
	      if (this.healthBar.power > 0) {
	        this.healthBar.power -= 3;
	      }
	    }
	  }, {
	    key: 'heal',
	    value: function heal() {
	      if (this.healthBar.health < 50) {
	        this.healthBar.health += 1;
	      } else {
	        this.healthBar.power += 2;
	      }
	    }
	  }, {
	    key: '_updatePosWithinBounds',
	    value: function _updatePosWithinBounds(newPos) {
	      if (newPos[0] < this.bounds[0] - 15 && newPos[0] > 15) {
	        this.pos[0] = newPos[0];
	      }
	      if (newPos[1] < this.bounds[1] - 15 && newPos[1] > 15) {
	        this.pos[1] = newPos[1];
	      }
	    }
	  }, {
	    key: '_keyActions',
	    value: function _keyActions(e, status) {
	      var code = event.keyCode;
	      var key = void 0;
	
	      switch (code) {
	        case 32:
	          key = 'SPACE';
	          break;
	        case 37:
	          key = 'LEFT';
	          break;
	        case 38:
	          key = 'UP';
	          break;
	        case 39:
	          key = 'RIGHT';
	          break;
	        case 40:
	          key = 'DOWN';
	          break;
	        case 70:
	          key = 'F';
	          break;
	        case 68:
	          key = 'D';
	          break;
	      }
	
	      this.pressedKeys[key] = status;
	    }
	  }, {
	    key: '_keyListeners',
	    value: function _keyListeners() {
	      var self = this;
	      document.addEventListener('keydown', function (e) {
	        self._keyActions(e, true);
	      });
	      document.addEventListener('keyup', function (e) {
	        self._keyActions(e, false);
	      });
	    }
	  }]);
	
	  return Ship;
	}(_movingObject.MovingObject);
	
	exports.Ship = Ship;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HealthBar = function () {
	  function HealthBar(ctx, dim) {
	    _classCallCheck(this, HealthBar);
	
	    this.width = 50;
	    this.health = 50;
	    this.power = 0;
	    var x = (dim[0] - 800) / 2 - 50;
	    var y = dim[1];
	    this.pos = [x, y];
	    this.ctx = ctx;
	    this.dim = dim;
	    this.score = 0;
	  }
	
	  _createClass(HealthBar, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx.clearRect(0, 0, this.dim[0], this.dim[1]);
	      this.ctx.fillStyle = "#7f4c87";
	      this.ctx.font = "18px adventor-regular";
	      this.ctx.fillText("" + this.score, this.pos[0] + 855, 50);
	      this.ctx.fillStyle = "#a4ff49";
	      this.ctx.strokeStyle = "#708e52";
	      this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.health * -10);
	      this.ctx.strokeRect(this.pos[0], this.pos[1], this.width, -500);
	      this.ctx.fillRect(this.pos[0] + 850, this.pos[1], this.width, this.power * -10);
	      this.ctx.strokeRect(this.pos[0] + 850, this.pos[1], this.width, -500);
	    }
	  }, {
	    key: "addPoints",
	    value: function addPoints(points) {
	      this.score += points;
	    }
	  }]);
	
	  return HealthBar;
	}();
	
	exports.HealthBar = HealthBar;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map