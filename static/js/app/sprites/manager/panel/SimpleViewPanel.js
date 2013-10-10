define( [], function() {

	var SimpleViewPanel = function( options ) {

		var self = this;

		this.spriteRenderer = options.spriteRenderer;

		this.dirty = ko.observable( false );

		var editContext = options.context;

		this.render = function( container ) {
			if ( self.spriteRenderer ) {
				var spriteFrame = editContext.spriteFrame();

				if ( spriteFrame ) {

					var renderedDom = self.spriteRenderer.render( editContext.spriteFrame(), 0, self );

					var $container = $( container );

					$container.empty();
					$container.append( renderedDom );

					if ( $container.height() < renderedDom.height() ) {
						$container.height( renderedDom.height() );
					}

				}

			}

			self.dirty( false );
		};

		this.handleEvent = function( event, parameters ) { };

	};

	return SimpleViewPanel;

} );