define( [ 'sprites/manager/NewSpriteForm' ], function( NewSpriteForm ) {

  var SpriteManager = function( options ) {

    var self = this;

    this.game = ko.observable();

    this.manage = function( game ) {
      self.game( game );
    };

    this.spriteEditor = options.spriteEditor;
    this.spriteRenderer = options.spriteRenderer;

    this.newSpriteForm = new NewSpriteForm( {
      callback : function( newSprite ) {
        self.game().sprites.push( newSprite );
      }
    } );

    this.editSprite = function( sprite ) {
      self.spriteEditor.setSprite( sprite );
    };

    this.clear = function() {
      self.game( null );
      self.spriteEditor.clear();
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