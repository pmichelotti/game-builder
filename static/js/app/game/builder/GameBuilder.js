define( [ 'game/Game', 'game/EditableGame' ], function( Game, EditableGame ) {

  var DASHBOARD_MODE = "dashboard";
  var SCREEN_MANAGER_MODE = "screen-manager";
  var SPRITE_MANAGER_MODE = "sprite-manager";
  var SCREEN_FLOW_MANAGER_MODE = "screen-flow-manager";
  var INTERACTION_MANAGER_MODE = "interaction-manager";

  var GameBuilder = function( options ) {

    var self = this;

    this.game = ko.observable();

    this.mode = ko.observable( DASHBOARD_MODE );

    this.loading = ko.observable( false );

    this.screenManager = options.screenManager;
    this.screenFlowManager = options.screenFlowManager;
    this.spriteManager = options.spriteManager;
    this.interactionManager = options.interactionManager;

    this.setGame = function( game ) {
      self.game( new EditableGame( game ) );
      self.screenManager.manage( self.game() );
      self.screenFlowManager.manage( self.game() );
      self.spriteManager.manage( self.game() );
      self.interactionManager.manage( self.game() );
    };

    this.clear = function() {
      self.game( null );
      self.screenManager.clear();
      self.screenFlowManager.clear();
      self.spriteManager.clear();
      self.interactionManager.clear();
    };

    this.openDashboard = function() {
      self.mode( DASHBOARD_MODE );
    };

    this.openScreenManager = function() {
      self.mode( SCREEN_MANAGER_MODE );
    };

    this.openSpriteManager = function() {
      self.mode( SPRITE_MANAGER_MODE );
    };
    
    this.openInteractionManager = function() {
      self.mode( INTERACTION_MANAGER_MODE );
    };
    
    this.openScreenFlowManager = function() {
      self.mode( SCREEN_FLOW_MANAGER_MODE );
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

    this.isSpriteManagerMode = ko.computed( function() {
      return self.mode() === SPRITE_MANAGER_MODE;
    } );
    
    this.isInteractionManagerMode = ko.computed( function() {
      return self.mode() === INTERACTION_MANAGER_MODE;
    } );
    
    this.isScreenFlowManagerMode = ko.computed( function() {
      return self.mode() === SCREEN_FLOW_MANAGER_MODE;
    } );

    this.save = function() {

      return self.game().save();

    };

  };

  return GameBuilder;

} );