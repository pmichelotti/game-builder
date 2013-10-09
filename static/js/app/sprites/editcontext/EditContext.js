define( [ 'sprite/EditableSpriteFrame' ], function( EditableSpriteFrame ) {

	var EditContext = function( options ) {

		var self = this;

		this.spriteFrame = ko.observable();

		this.editPanel = options.editPanel;
		this.viewPanel = options.viewPanel;
		this.tools = options.tools || Array();
		this.pallet = options.pallet;

		this.editPanel.setEditContext( self );
		this.viewPanel.setEditContext( self );

		this.currentTool = ko.observable( this.tools[ 0 ] );

		this.setSpriteFrame = function( spriteFrame ) {
			self.spriteFrame( new EditableSpriteFrame( spriteFrame ) );
			self.setDirty();
		};

		this.draw = function( pixel ) {
			if ( self.spriteFrame() ) {
				self.spriteFrame().draw( pixel );

				self.setDirty();
			}
		};

		this.erase = function( pixel ) {
			if ( self.spriteFrame() ) {
				self.spriteFrame().erase( pixel );

				self.setDirty();
			}
		};

		this.handleEvent = function( event, eliciter, parameters ) {

			if ( self.currentTool() && self.currentTool().listeners[ event.type ] ) {
				self.currentTool().listeners[ event.type ].call( self.currentTool(), event, self, eliciter, parameters );
			}

		};

		this.setDirty = function() {
			self.editPanel.dirty( true );
			self.viewPanel.dirty( true );
		};

		this.clear = function() {
			self.spriteFrame( null );
			self.setDirty();
		};

	};

	return EditContext;

} );