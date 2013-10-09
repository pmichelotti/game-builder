define( [ 'game/Game', 'game/EditableGame' ], function( Game, EditableGame ) {

  var DASHBOARD_MODE = "dashboard";
  var SCREEN_MANAGER_MODE = "screen-manager";
  //var SPRITE_MANAGER_MODE = "sprite-manager";

  var GameBuilder = function( options ) {

    var self = this;

    this.game = ko.observable();

    this.mode = ko.observable( DASHBOARD_MODE );

    this.loading = ko.observable( false );

    this.screenManager = options.screenManager;
    //this.spriteManager = options.spriteManager;

    this.setGame = function( game ) {
      self.game( new EditableGame( game ) );
      self.screenManager.manage( self.game() );
      //self.spriteManager.manage( self.game() );
    };

    this.clear = function() {
      self.game( null );
      self.screenManager.clear();
      //self.spriteManager.clear();
    };

    this.openDashboard = function() {
      self.mode( DASHBOARD_MODE );
    };

    this.openScreenManager = function() {
      self.mode( SCREEN_MANAGER_MODE );
    };

    this.isDashboardMode = ko.computed( function() {
      return self.mode() === DASHBOARD_MODE;
    } );

    this.isNotDashboardMode = ko.computed( function() {
      return !self.isDashboardMode();
    } );

    this.isScreenManagerMode = ko.computed( function() {
      return self.mode() === SCREEN_MANAGER_MODE;
    } );

    this.save = function() {

      return self.game().save();

    };

  };

  return GameBuilder;

} );