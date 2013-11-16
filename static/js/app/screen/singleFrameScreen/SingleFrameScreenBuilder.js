define( 
    [ 'screen/singleFrameScreen/SingleFrameScreen', 'builder/fields/StringField', 'builder/fields/SizeField', 'builder/fields/SpriteField', 'builder/fields/FrameField', 'builder/fields/SingleFramePreviewField', 'builder/fields/NumberField', 'builder/fields/InteractionField' ], 
    function( SingleFrameScreen, StringField, SizeField, SpriteField, FrameField, SingleFramePreviewField, NumberField, InteractionField ) {

	var SingleFrameScreenBuilder = function() {

		var self = this;
		
		this.game = ko.observable();

		this.screen = ko.observable();

		var spriteField = new SpriteField( 'Sprite' );
		var frameField = new FrameField( 'Frame', spriteField );
		var sizeField = new SizeField( 'Size' );
		
		this.fields = {
		  
		    "name" : new StringField( 'Name' ), 
		    "size" : sizeField, 
		    "sprite" : spriteField, 
		    "frame" : frameField, 
		    "preview" : new SingleFramePreviewField( 'Preview', frameField, sizeField.width, sizeField.height ),
		    "duration" : new NumberField( 'Duration' ), 
		    "bypassInteraction" : new InteractionField( 'Bypass Interaction' )
		
		};
		
		this.initialize = function( screen, game ) {
		  self.game( game );
		  self.screen( screen );
		  
		  self.fields.name.initialize( screen.name, game );
		  self.fields.size.initialize( screen.size, game );
		  self.fields.sprite.initialize( screen.sprite, game );
		  self.fields.frame.initialize( screen.frame, game );
		  self.fields.duration.initialize( screen.duration, game );
		  self.fields.bypassInteraction.initialize( screen.bypassInteraction, game );
		  
		};

		this.save = function() {
		  
		  var screenOptions = {
		      name : self.fields.name.value(), 
		      size : self.fields.size.value(),
		      sprite : self.fields.sprite.value(), 
		      frame : self.fields.frame.value(), 
		      duration : self.fields.duration.value(), 
		      bypassInteraction : self.fields.bypassInteraction.value()
		  };
		  
		  return new SingleFrameScreen( self.screen().id, screenOptions );
		};


	};

	return SingleFrameScreenBuilder;

} );
