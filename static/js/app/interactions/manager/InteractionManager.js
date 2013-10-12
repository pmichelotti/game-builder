define( [ 'interactions/manager/NewInteractionForm', 'interactions/EditableInteraction', 'interactions/InteractionMapping' ], function( NewInteractionForm, EditableInteraction, InteractionMapping ) {
	
	var InteractionManager = function( options ) {
	
		options = options || {};
		
		var self = this;
		
		this.game = ko.observable();
		
		this.currentEditableInteraction = ko.observable();
		
		this.manage = function( game ) {
			self.game( game );
		};
		
		this.newInteractionForm = new NewInteractionForm( {
		  callback : function( interaction ) {
		    self.game().interactions.push( interaction );
		  }
		} );
		
		this.deleteInteraction = function( interaction ) {
		  self.game().interactions.remove( interaction );
		};
		
		this.deleteCurrentInteraction = function() {
		  
		  if ( self.currentEditableInteraction() ) {
		    self.deleteInteraction( self.currentEditableInteraction().interaction );
		    self.currentEditableInteraction( null );
		  }
		  
		};
		
		this.editInteraction = function( interaction ) {
		  self.currentEditableInteraction( new EditableInteraction( interaction ) );
		};
		
		this.saveInteraction = function() {
		  if ( self.currentEditableInteraction() ) {
		    self.game().interactions.replace( self.currentEditableInteraction().save() );
		    self.currentEditableInteraction( null );
		  }
		};
		
		var $currentMappingDom = null;
		this.addMapping = function( interaction, event ) {
		
		  if ( $currentMappingDom ) {
		    $currentMappingDom.off( 'keydown' );
		  }
		  
		  $currentMappingDom = $( event.currentTarget );
		  $currentMappingDom.keydown( function( event ) {
		    
		    console.log( event.keyCode );
		    
		    if ( event.keyCode ) {
		      self.currentEditableInteraction().addMapping( new InteractionMapping( InteractionMapping.KEYBOARD_INTERACTION, event.keyCode ) );
		    }
		    
		    $currentMappingDom.off( 'keydown' );
		    
		    event.preventDefault();
		    event.stopPropagation();
		    return false;
		    
		  } );
		  
		};
	};
	
	return InteractionManager;
	
} );