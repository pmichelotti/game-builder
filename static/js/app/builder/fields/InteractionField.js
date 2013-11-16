define( [], function() {
  
  var InteractionField = function( fieldName ) {
    
    var self = this;
    
    this.fieldName = ko.observable( fieldName );
    
    this.value = ko.observable();
    this.context = ko.observable();
    
    this.options = ko.computed( function() {
      
      if ( self.context() && self.context().interactions() ) {
        return self.context().interactions();
      }
      
      return Array();
      
    } );
    
    this.initialize = function( fieldValue, context ) {
      self.value( fieldValue );
      self.context( context );
    };
    
  };
  
  return InteractionField;
  
} );