define( [], function() {
  
  var SpriteField = function( fieldName ) {
    
    var self = this;
    
    this.fieldName = ko.observable( fieldName );
    
    this.context = ko.observable();
    
    this.value = ko.observable();
    
    this.options = ko.computed( function() {
      
      if ( self.context() ) {
        return self.context().sprites();
      }
      
      return Array();
      
    } );
    
    this.initialize = function( fieldValue, context ) {
      self.context( context );
      
      self.value( fieldValue );
    };
    
  };
  
  return SpriteField;
  
} );