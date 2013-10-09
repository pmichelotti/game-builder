define( [], function() {

  var SPRITE_LIST_MODE = 'sprite-list';

  var SpriteManager = function( options ) {

    var self = this;

    this.mode = ko.observable( SPRITE_LIST_MODE );

    this.currentSpriteBuilder = ko.observable();

    this.sprites = ko.observableArray( options.sprites || Array() );

    this.spriteEditor = options.spriteEditor;

    this.editSprite = function( sprite ) {
      self.spriteEditor.setSprite( sprite );
    };

    this.isSpriteEditMode = ko.computed( function() {
      return self.spriteEditor.hasCurrentSprite();
    } );

    this.isSpriteListMode = ko.computed( function() {
      return !self.isSpriteEditMode();
    } );

  };

  return SpriteManager;

} );