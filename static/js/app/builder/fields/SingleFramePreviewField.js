define( [], function() {
  
  var SingleFramePreviewField = function( fieldName, frameProvider, widthProvider, heightProvider ) {
    
    this.fieldName = ko.observable( fieldName );
    
    this.value = frameProvider.value;
    this.width = widthProvider;
    this.height = heightProvider;
    
  };
  
  return SingleFramePreviewField;
  
} );