define( [ 'game/builder/GameBuilder', 'application/NewGameForm' ], function( GameBuilder, NewGameForm ) {

  var GameBuilderApplication = function( options ) {

    options = options || {};

    var self = this;

    var gameBuilderOptions = {
      screenManager : options.screenManager
    };

    this.persistenceManager = options.persistenceManager;

    this.loading = ko.observable( false );
    this.saving = ko.observable( false );

    this.games = ko.observableArray( options.games || Array() );

    this.newGameForm = new NewGameForm( {
      callback : function( game ) {
        self.games.push( game );
      }
    } );

    this.currentGameBuilder = ko.observable();

    this.isEditMode = ko.computed( function() {
      return !!self.currentGameBuilder();
    } );

    this.isGameListMode = ko.computed( function() {
      return !self.isEditMode();
    } );

    this.editGame = function( game ) {
      self.currentGameBuilder( new GameBuilder( game, gameBuilderOptions ) );
    };

    this.gameListMode = function() {
      self.currentGameBuilder( null );
    };

    this.saveGame = function( game ) {
      self.saving( true );
      if ( this.persistenceManager ) {
        this.persistenceManager.saveGame( game, function( success, msg ) {
          self.saving( false );
        } );
      }
    };

    this.saveGameBuilder = function() {
      if ( self.currentGameBuilder() ) {
        self.saveGame( self.currentGameBuilder().save() );
      }
    };

    this.loadGames = function() {

      self.persistenceManager.loadGames( function( success, games, failures ) {
        if ( success ) {
          games.forEach( function( curGame ) {
            self.games.push( curGame );
          } );
        }
        else {
          console.log( 'Failures' );
          console.log( failures );
        }
      } );

    };

    this.load = function( game ) {

      if ( !game ) {
        loadGames();
        return;
      }
    };


  };

  return GameBuilderApplication;

} );