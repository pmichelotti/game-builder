define( [ 'game/Game' ], function( Game ) {

  var EditableGame = function( game ) {

    var self = this;

    this.game = game;

    this.name = ko.observable( game.name );

    this.screens = ko.observableArray( game.screens || Array() );
    this.sprites = ko.observableArray( game.sprites || Array() ).extend( { replacable : true } );


    this.save = function() {
      var gameOptions = {};

      gameOptions[ 'name' ] = self.name();

      gameOptions[ 'screens' ] = self.screens();

      gameOptions[ 'sprites' ] = self.sprites();

      return new Game( self.game.id, gameOptions );

    };
  };

  return EditableGame;

} );