define( [ 'game/builder/GameBuilder', 'application/NewGameForm' ], function( GameBuilder, NewGameForm ) {

  var GameBuilderApplication = function( options ) {

    options = options || {};

    var self = this;

    var gameBuilderOptions = {
      screenManager : options.screenManager
    };

    this.loading = ko.observable( false );

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

  };

  return GameBuilderApplication;

} );