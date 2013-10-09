define( [], function() {

	var ViewPanel = function( options ) {

		var self = this;

		this.spriteRenderer = options.spriteRenderer;

		this.zoom = ko.observable( 0 );

		this.dirty = ko.observable( false );

		var editContext = null;

		this.setEditContext = function( context ) {
			if ( !editContext ) {
				editContext = context;
			}
			else {
				throw "Edit Context can only be set once for the panel";
			}
		};

		this.zoomIn = function() {
			if ( self.zoom() < 5 ) {
				self.zoom( self.zoom() + 1 );

				self.dirty( true );
			}
		};

		this.zoomOut = function() {
			if ( self.zoom() > 0 ) {
				self.zoom( self.zoom() - 1 );

				self.dirty( true );
			}
		};

		this.render = function( container ) {
			if ( self.spriteRenderer ) {
				var renderedDom = self.spriteRenderer.render( editContext.spriteFrame(), self.zoom(), self );

				var $container = $( container );

				$container.empty();
				$container.append( renderedDom );

				if ( $container.height() < renderedDom.height() ) {
					$container.height( renderedDom.height() );
				}

			}

			self.dirty( false );
		};

		this.handleEvent = function( event, parameters ) {
			if ( editContext ) {
				editContext.handleEvent( event, self, parameters );
			}
		};
	};

	return ViewPanel;

} );