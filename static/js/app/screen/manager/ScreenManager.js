define( [ 'screen/manager/NewScreenForm' ], function( NewScreenForm ) {

  var SCREEN_LIST_MODE = "screen-list";
  var SCREEN_EDIT_MODE = "screen-edit";

  var ScreenManager = function( options ) {

    var self = this;

    /*
     * A registered screen builder defines, for a particular id, a
     * builder constructor and a renderable form field
     */
    this.registeredScreenTypes = options.types;

    this.screens = ko.observableArray( options.screens || Array() );

    this.currentScreenBuilder = ko.observable();

    this.mode = ko.observable( SCREEN_LIST_MODE );

    this.newScreenForm = new NewScreenForm( {
      screenTypes : self.registeredScreenTypes,
      callback : function( newScreen ) {
        self.screens.push( newScreen );
      }
    } );

    this.newScreenForm.name.subscribe( function( newValue ) {
      console.log( newValue );
    } );

    this.editScreen = function( screen ) {
      self.currentScreenBuilder( new getScreenBuilderForScreenType( screen )( screen ) );
      self.mode( SCREEN_EDIT_MODE );
    };
  };

  return ScreenManager;

} );