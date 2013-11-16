define( [ 'shapes/Size' ], function( Size ) {
  
  var SizeField = function( fieldName ) {
  
    var self = this;
    
    this.fieldName = ko.observable( fieldName );
    
    this.width = ko.observable();
    this.height = ko.observable();
    
    this.value = function() {
      return new Size( self.width(), self.height() );
    };
    
    this.initialize = function( fieldValue, context ) {
    
      fieldValue = fieldValue || {};
      
      self.width( fieldValue.width );
      self.height( fieldValue.height );
      
    };
    
  };
  
  return SizeField;
  
} );