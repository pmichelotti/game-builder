define( [ 'interactions/Interaction' ], function( Interaction ) {
	
	var EditableInteraction = function( interaction ) {
		
		var self = this;
		
		this.interaction = interaction;
		
		this.name = ko.observable( interaction.name );
		this.mappings = ko.observableArray( interaction.mappings || Array() );

		this.addMapping = function( mapping ) {
		  
		  if ( !self.mappings().some( function( curItem ) {
		    return curItem.id === mapping.id;
		  } ) ) {
		    self.mappings.push( mapping );
		  }
		  
		};
		
		this.removeMapping = function( mapping ) {
		  self.mappings.remove( mapping );
		};
		
		this.save = function() {
			var newInteraction = new Interaction( self.interaction.id, self.name(), self.mappings() );
			
			return newInteraction;
		};
		
	};
	
	return EditableInteraction;
	
} );