define( [], function() {
	
	/**
	 * A Generic Interaction represents an interaction type which may be 
	 * passed to a screen in a GameEngine.  An example is the Interaction 
	 * 'move-left'.  'move-left' is an Interaction which may be mapped to the 
	 * left arrow key.  A game engine may use this, passing start and stop 
	 * interactions of the generic type to the Screen when a user presses 
	 * and releases a left arrow key. 
	 * 
	 * An interaction is associated with any number of mappings.  These 
	 * mappings indicate either the key or mouse event which would trigger 
	 * the interaction.  An individual mapping is an object with a type 
	 * and an identifier.  The type is one of 
	 * 
	 * <ul>
	 *   <li>key-event</li>
	 *   <li>mouse-event</li>
	 * </ul>
	 * 
	 * For key events, the identifier is the event code for the key pressed.  For 
	 * a mouse the identifier is the mouse event type. 
	 * 
	 * @param name String representing the generic interaction
	 */
	var Interaction = function( id, name, mappings ) {
	
	  var self = this;
	  
		this.id = id;
		this.name = name;
		this.mappings = mappings;
		
		this.toJSON = function() {
		  
		  var retObject = {};
		  
		  retObject[ 'id' ] = self.id;
		  retObject[ 'name' ] = self.name;
		  retObject[ 'mappings' ] = Array();
		  
		  self.mappings.forEach( function( curMapping ) {
		    retObject[ 'mappings' ].push( curMapping.toJSON() );
		  } );
		  
		  return retObject;
		  
		};
	};
	
	return Interaction;
	
} );