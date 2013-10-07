define( [], function() {

  var ScreenType = function( options ) {

    this.screenConstructor = options.screenConstructor;
    this.screenBuilder = options.screenBuilder;
    this.name = options.name;

  };

  return ScreenType;

} );