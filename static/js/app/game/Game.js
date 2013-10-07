define( [], function() {

  var Game = function( id, options ) {

    options = options || {};

    this.id = id;

    this.name = options.name || id;

    this.screens = options.screens || Array();

  };

  return Game;

} );