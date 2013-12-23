define( [ 'sprites/sprite/VirtualPixel' ], function( VirtualPixel ) {
  
  var EditableVirtualPixel = function( virtualPixel ) {
  
    var self = this;
    this.virtualPixel = virtualPixel || {};
    
    this.position = virtualPixel.position;
    this.color = ko.observable( this.virtualPixel.color );
    this.opacity = ko.observable( this.virtualPixel.opacity );
    
    /**
     * Update takes as input a non-editable VirtualPixel instance and updates the color and opacity 
     * observables to match those of the input pixel.  Position remains unchanged. 
     */
    this.update = function( pixel ) {
      if ( pixel ) {
        self.color( pixel.color );
        self.opacity( pixel.opacity );
      }
    };
    
    this.save = function() {
      return new VirtualPixel( 
          self.position, 
          self.color(), 
          self.opacity() );
    };
    
  };
  
  return EditableVirtualPixel;
  
} );