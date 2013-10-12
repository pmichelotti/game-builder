define( [ 'utils/keyCodes' ], function( keyCodes ) {
	
	var InteractionMapping = function( type, identifier ) {
		
		var self = this;
		
		this.id = type + '--' + identifier;
		
		this.type = type;
		this.identifier = identifier;
		
		this.prettyIdentifier = keyCodes[ identifier ] || identifier;
		
		this.toJSON = function() {
			
			return {
				type : self.type, 
				identifier : self.identifier
			};
			
		};
		
	};
	
	InteractionMapping.KEYBOARD_INTERACTION = 'key-event';
	InteractionMapping.MOUSE_INTERACTION = 'mouse-event';
	
	return InteractionMapping;
	
} );