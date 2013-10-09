define( [ 'game/Game' ], function( Game ) {

  var DASHBOARD_MODE = "dashboard";
  var SCREEN_MANAGER_MODE = "screen-manager";

  var GameBuilder = function( game, options ) {

    var self = this;

    this.game = game;

    this.mode = ko.observable( DASHBOARD_MODE );

    this.loading = ko.observable( false );

    this.name = ko.observable( game.name );

    this.screenManager = options.screenManager;

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

      var id = game.id;
      var name = self.name();


      return new Game( id, {
        name : name
      } );

    };

  };

  return GameBuilder;

} );