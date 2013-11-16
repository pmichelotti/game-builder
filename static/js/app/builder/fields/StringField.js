define( [], function() {
  
  var StringField = function( fieldName ) {
    
    var self = this;
    
    this.fieldName = ko.observable( fieldName );
    this.value = ko.observable();
    
    this.initialize = function( fieldValue, context ) {
      self.value( fieldValue );
    };
    
  };
  
  return StringField;
  
} );