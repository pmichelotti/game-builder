define( [], function() {
  
  var FrameField = function( fieldName, spriteField ) {
  
    var self = this;
    
    this.fieldName = ko.observable( fieldName );
    
    this.value = ko.observable();
    this.spriteField = spriteField;
    
    this.options = ko.computed( function() {
    
      if ( self.spriteField && self.spriteField.value() ) {
        return self.spriteField.value().spriteFrames;
      }
      
      return Array();
      
    } );
    
    /**
     * 
     */
    this.initialize = function( fieldValue, context ) {
      
      self.value( fieldValue );
      
    };
    
  };
  
  return FrameField;
  
} );