define( [ 'sprites/sprite/Size' ], function( Size ) {
  
  var EditableSize = function( size ) {
  
    var self = this;
    this.size = size || {};
    
    this.width = ko.observable( this.size.width );
    this.height = ko.observable( this.size.height );
    
    this.save = function() {
      
      return new Size( self.width(), self.height() );
      
    };
    
    this.subscribe = function( callback ) {
    
      self.width.subscribe( callback );
      self.height.subscribe( callback );
      
    };
    
  };
  
  return EditableSize;
  
} );