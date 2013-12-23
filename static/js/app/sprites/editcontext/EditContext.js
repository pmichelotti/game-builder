define( [ 'sprites/sprite/EditableSpriteFrame' ], function( EditableSpriteFrame ) {

  /**
   * The EditContext exposes an abstract sprite drawing API and manages sprite Panels, tools, and pallets. 
   */
  var EditContext = function( options ) {

    var self = this;

    this.spriteFrame = ko.observable();

    this.editPanel = options.editPanelFactory.make( self, self.spriteFrame );
    //this.viewPanel = options.viewPanelFactory( { editContext : self } );
    this.tools = options.tools || Array();
    this.pallet = options.pallet;

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

    /**
     * Delegates event handling to the currently selected tool
     * 
     * @param event
     * @param eliciter
     * @param parameters
     */
    this.handleEvent = function( event, eliciter, parameters ) {

      if ( self.currentTool() && self.currentTool().listeners[ event.type ] ) {
        self.currentTool().listeners[ event.type ].call( self.currentTool(), event, self, eliciter, parameters );
      }

    };

    this.setDirty = function() {
      //self.editPanel.dirty( true );
      //self.viewPanel.dirty( true );
    };

    this.clear = function() {
      self.spriteFrame( null );
      self.setDirty();
    };

  };

  return EditContext;

} );