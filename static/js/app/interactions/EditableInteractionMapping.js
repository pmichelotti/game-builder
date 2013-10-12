define( 'interactions/InteractionMapping', function( InteractionMapping ) {
	
	var EditableInteractionMapping = function( interactionMapping ) {
		
		var self = this;
		
		this.type = ko.observable( interactionMapping.type || InteractionMapping.KEYBOARD_INTERACTION );
		this.identifier = ko.observable( interactionMapping.identifier || null );

		this.typeOptions = [ InteractionMapping.KEYBOARD_INTERACTION, InteractionMapping.MOUSE_INTERACTION ];
		
		this.save = function() {
			return new InteractionMapping( self.type(), self.identifier() );
		};
		
	};
	
	return EditableInteractionMapping;
	
} );