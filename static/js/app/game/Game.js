define( [], function() {

  var Game = function( id, options ) {

    options = options || {};

    var self = this;

    this.id = id;

    this.name = options.name || id;

    this.screens = options.screens || Array();
    this.sprites = options.sprites || Array();

    this.toJSON = function() {

      var retObject = {};

      retObject[ 'id' ] = self.id;
      retObject[ 'name' ] = self.name;

      retObject[ 'screens' ] = Array();

      self.screens.forEach( function( curScreen ) {
        retObject[ 'screens' ].push( curScreen.toJSON() );
      } );

      retObject[ 'sprites' ] = Array();

      self.sprites.forEach( function( curSprite ) {
        retObject[ 'sprites' ].push( curSprite.toJSON() );
      } );

      return retObject;
    };
  };

  return Game;

} );