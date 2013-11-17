define( [ 'screenFlow/ScreenFlow', 'properties/Properties' ], function( ScreenFlow, Properties ) {

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
    
    this.properties = options.properties || new Properties();

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
      
      retObject[ 'properties' ] = self.properties.toJSON();
      
      return retObject;
    };
  };

  return Game;

} );