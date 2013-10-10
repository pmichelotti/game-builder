define( [ 'sprites/manager/NewSpriteForm', 'sprites/manager/panel/SimpleViewPanel' ], function( NewSpriteForm, SimpleViewPanel ) {

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

    this.spriteViewContext = function( sprite ) {
      var editContext = {
        spriteFrame : function() {
          if ( sprite.spriteFrames.length ) {
            return sprite.spriteFrames[ 0 ];
          }

          return null;
        }
      };

      return new SimpleViewPanel( {
        spriteRenderer : self.spriteRenderer,
        context : editContext
      } );
    };

    this.editSprite = function( sprite ) {
      self.spriteEditor.setSprite( sprite );
    };

    this.deleteSprite = function( sprite ) {
      alert( 'This is where sprite deletion would go' );
    };

    this.saveSprite = function() {
      if ( self.spriteEditor.hasCurrentSprite() ) {
        self.game().sprites.replace( self.spriteEditor.saveSprite() );
      }
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