define( [ 'game/Game', 'screenFlow/EditableScreenFlow', 'properties/EditableProperties' ], function( Game, EditableScreenFlow, EditableProperties ) {

  var EditableGame = function( game ) {

    var self = this;

    this.game = game;

    this.name = ko.observable( game.name );

    this.screens = ko.observableArray( game.screens || Array() ).extend( { replacable : true } );
    this.screenFlow = new EditableScreenFlow( game.screenFlow );
    this.sprites = ko.observableArray( game.sprites || Array() ).extend( { replacable : true } );
    this.interactions = ko.observableArray( game.interactions || Array() ).extend( { replacable : true } );
    this.gameClocks = ko.observableArray( game.gameClocks || Array() ).extend( { replacable : true } );
    this.properties = new EditableProperties( game.properties );


    this.save = function() {
      var gameOptions = {};

      gameOptions[ 'name' ] = self.name();

      gameOptions[ 'screens' ] = self.screens();
      
      gameOptions[ 'screenFlow' ] = self.screenFlow.save();

      gameOptions[ 'sprites' ] = self.sprites();
      
      gameOptions[ 'interactions' ] = self.interactions();
      
      gameOptions[ 'gameClocks' ] = self.gameClocks();
      
      gameOptions[ 'properties' ] = self.properties.save();

      return new Game( self.game.id, gameOptions );

    };
  };

  return EditableGame;

} );