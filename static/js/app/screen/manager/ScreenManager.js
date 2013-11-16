define( [ 'screen/manager/NewScreenForm', 'screen/singleFrameScreen/SingleFrameScreenBuilder' ], function( NewScreenForm, SingleFrameScreenBuilder ) {

  var SCREEN_LIST_MODE = "screen-list";
  var SCREEN_EDIT_MODE = "screen-edit";
  
  //TODO: As more builders are created this should be moved outside the manager
  var singleFrameScreenBuilder = new SingleFrameScreenBuilder();
  
  var getScreenBuilderForScreenType = function( screen ) {
    
    return singleFrameScreenBuilder;
    
  };

  var ScreenManager = function( options ) {

    var self = this;

    this.game = ko.observable();

    /*
     * A registered screen builder defines, for a particular id, a
     * builder constructor and a renderable form field
     */
    this.registeredScreenTypes = options.types;

    //this.screens = ko.observableArray( options.screens || Array() ).extend( { "replacable" : true } );

    this.currentScreenBuilder = ko.observable();

    this.mode = ko.observable( SCREEN_LIST_MODE );

    this.manage = function( game ) {
      self.game( game );
    };

    this.clear = function() {
      self.game( null );
    };

    this.newScreenForm = new NewScreenForm( {
      screenTypes : self.registeredScreenTypes,
      callback : function( newScreen ) {
        self.game().screens.push( newScreen );
      }
    } );

    this.newScreenForm.name.subscribe( function( newValue ) {
      console.log( newValue );
    } );

    this.editScreen = function( screen ) {
      var screenBuilderForScreen = getScreenBuilderForScreenType( screen );
      screenBuilderForScreen.initialize( screen, self.game() );
      self.currentScreenBuilder( screenBuilderForScreen );
      self.mode( SCREEN_EDIT_MODE );
    };
    
    this.saveScreen = function() {
      if ( self.currentScreenBuilder() ) {
        
        var savedScreen = self.currentScreenBuilder().save();
        
        self.game().screens.replace( savedScreen );
        
        self.currentScreenBuilder( null );
        
        //TODO: Switching mode automatically may not make sense for more complex screens
        self.mode( SCREEN_LIST_MODE );
        
      }
    };
    
    this.returnToScreenListMode = function() {
      self.mode( SCREEN_LIST_MODE );
    };
    
    this.isScreenListMode = ko.computed( function() {
      return self.mode() === SCREEN_LIST_MODE;
    } );
    
    this.isScreenEditMode = ko.computed( function() {
      return self.mode() === SCREEN_EDIT_MODE;
    } );

  };

  return ScreenManager;

} );