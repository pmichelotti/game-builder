define( [], function() {

  /**
   * A Panel represents a rendered Sprite Frame and establishes what operations are 
   * available within the context of the panel and how those operations are executed.  
   */
	var EditPanel = function( options ) {

	  options = options || {};
	  
		var self = this;

		this.editContext = options.editContext;
		
		this.zoom = ko.observable( 5 );

		this.spriteFrame = options.spriteFrame;

		this.draw = function( pixel ) {
			if ( self.editContext ) {
				self.editContext.draw( pixel );
			}
		};

		this.erase = function( pixel ) {
			if ( self.editContext ) {
			  self.editContext.erase( pixel );
			}
		};

		this.zoomIn = function() {
			if ( self.zoom() < 10 ) {
				self.zoom( self.zoom() + 1 );
			}
		};

		this.zoomOut = function() {
			if ( self.zoom() > 0 ) {
				self.zoom( self.zoom() - 1 );
			}
		};

		/**
		 * Delegate event handling to the edit context if one has been set.
		 */
		this.handleEvent = function( dataModel, event ) {
			if ( self.editContext ) {
				self.editContext.handleEvent( event, self, { pixel : dataModel } );
			}
		};
		
		this.renderedPixelSize = ko.computed( function() {
		  if ( self.spriteFrame && self.spriteFrame() ) {
		    return self.spriteFrame().pixelSize() * ( self.zoom() + 1 );
		  }
		  return 0;  
		} );
		
		this.panelWidth = ko.computed( function() {
		  if ( self.spriteFrame && self.spriteFrame() ) {
  		  return self.renderedPixelSize() * self.spriteFrame().size.width();
		  }
		  return 0;
		} );
		
		this.panelHeight = ko.computed( function() {
		  if ( self.spriteFrame && self.spriteFrame() ) {
  		  return self.renderedPixelSize() * self.spriteFrame().size.height();
		  }
		  return 0;
		} );
		
		this.renderedPixelSizeStyle = ko.computed( function() {
		  return self.renderedPixelSize() + 'px';
		} );
		
		this.panelWidthStyle = ko.computed( function() {
		  return self.panelWidth() + 'px';
		} );
		
		this.panelHeightStyle = ko.computed( function() {
		  return self.panelHeight() + 'px';
		} );

	};

	return EditPanel;

} );