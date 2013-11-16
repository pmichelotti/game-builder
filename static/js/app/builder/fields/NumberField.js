define( [], function() {
  
  var NumberField = function( fieldName ) {
    
    var self = this;
    
    this.fieldName = ko.observable( fieldName );
    
    this.value = ko.observable();
    
    this.initialize = function( fieldValue ) {
      
      self.value( fieldValue );
      
    };
    
  };
  
  return NumberField;
  
} );