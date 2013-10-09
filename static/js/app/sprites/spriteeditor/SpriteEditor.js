define( [ 'sprites/sprite/EditableSprite', 'sprites/sprite/Size', 'utils/uniqueIdUtil' ], function( EditableSprite, Size, uniqueIdUtil ) {

  var SpriteEditor = function( options ) {

    var self = this;

    this.sprite = ko.observable();

    this.spriteFrameEditContext = options.spriteFrameEditContext;

    this.hasCurrentSprite = ko.computed( function() {
      return !!self.sprite();
    } );

    this.newFrameForm = new function() {

      var frameSelf = this;

      this.name = ko.observable();
      this.width = ko.observable( 10 );
      this.height = ko.observable( 10 );
      this.pixelSize = ko.observable( 5 );

      this.submit = function() {
        if ( frameSelf.name() ) {
          self.addFrame( frameSelf.name(), frameSelf.width(), frameSelf.height(), frameSelf.pixelSize() );
          frameSelf.clear();
        }
      };

      this.clear = function() {
        frameSelf.name( '' );
      };

    };

    this.newGroupForm = new function() {

      var groupSelf = this;

      this.name = ko.observable();

      this.submit = function() {
        self.addGroup( groupSelf.name() );
        groupSelf.name( '' );
      };

      this.clear = function() {
        groupSelf.name( '' );
      };
    };

    this.setSprite = function( sprite ) {
      self.spriteFrameEditContext.clear();
      self.sprite( new EditableSprite( sprite ) );
    };

    this.editFrame = function( spriteFrame ) {
      self.spriteFrameEditContext.setSpriteFrame( spriteFrame );
    };

    this.deleteFrame = function( spriteFrame ) {
      self.sprite().removeSpriteFrame( spriteFrame );
    };

    this.copyFrame = function( spriteFrame ) {
      self.sprite().addSpriteFrame( { spriteFrame : spriteFrame } );
      self.spriteFrameEditContext.setSpriteFrame( spriteFrame );
    };

    this.addFrame = function( name, width, height, pixelSize ) {
      var newSpriteFrame = self.sprite().addSpriteFrame( {
        id : uniqueIdUtil( name ),
        name : name,
        size : new Size( width, height ),
        pixelSize : pixelSize
      } );

      self.spriteFrameEditContext.setSpriteFrame( newSpriteFrame );
    };

    this.saveCurrentSpriteFrame = function() {
      var newSpriteFrame = self.spriteFrameEditContext.spriteFrame().save();
      self.sprite().updateSpriteFrame( newSpriteFrame );
    };

    this.addGroup = function( name ) {
      self.sprite().addSpriteFrameGroup( {
        id : uniqueIdUtil( name ),
        name : name
      } );
    };

    this.saveSprite = function() {
      return self.sprite().save();
    };

    this.clear = function() {
      self.sprite( null );
      self.spriteFrameEditContext.clear();
      self.newFrameForm.clear();
      self.newGroupForm.clear();
    };
  };

  return SpriteEditor;

} );
