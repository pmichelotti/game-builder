define( [ 'screenFlow/ScreenFlow' ], function( ScreenFlow ) {

  var Game = function( id, options ) {

    options = options || {};

    var self = this;

    this.id = id;

    this.name = options.name || id;

    this.screens = options.screens || Array();
    this.screenFlow = options.screenFlow || new ScreenFlow();
    this.sprites = options.sprites || Array();
    this.interactions = options.interactions || Array();
    this.gameClocks = options.gameClocks || Array();
    this.ticksPerSecond = options.ticksPerSecond || 15;
    
    this.properties = options.properties || Array();

    this.toJSON = function() {

      var retObject = {};

      retObject[ 'id' ] = self.id;
      retObject[ 'name' ] = self.name;

      retObject[ 'screens' ] = Array();

      self.screens.forEach( function( curScreen ) {
        retObject[ 'screens' ].push( curScreen.toJSON() );
      } );
      
      retObject[ 'screenFlow' ] = self.screenFlow.toJSON();

      retObject[ 'sprites' ] = Array();

      self.sprites.forEach( function( curSprite ) {
        retObject[ 'sprites' ].push( curSprite.toJSON() );
      } );
      
      retObject[ 'interactions' ] = Array();
      
      self.interactions.forEach( function( curInteraction ) {
        retObject[ 'interactions' ].push( curInteraction.toJSON() );
      } );
      
      retObject[ 'gameClocks' ] = Array();
      
      self.gameClocks.forEach( function( curGameClock ) {
        retObject[ 'gameClocks' ].push( curGameClock.toJSON() );
      } );
      
      retObject[ 'ticksPerSecond' ] = self.ticksPerSecond;
      
      retObject[ 'properties' ] = Array();
      
      self.properties.forEach( function( curProperty ) {
        retObject[ 'properties' ].push( curProperty.toJSON() );
      } );

      return retObject;
    };
  };

  return Game;

} );