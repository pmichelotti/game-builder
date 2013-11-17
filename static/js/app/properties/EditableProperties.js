define( [ 'properties/Properties' ], function( Properties ) {
  
  var EditableProperties = function( properties ) {
    
    var self = this;
    
    this.properties = properties;

    this.ticksPerSecond = ko.observable( properties.ticksPerSecond || 30 );
    this.renderingClock = ko.observable( properties.renderingClock );
    
    this.save = function() {
      
      var propertyOptions = {};
      
      propertyOptions[ 'ticksPerSecond' ] = self.ticksPerSecond();
      propertyOptions[ 'renderingClock' ] = self.renderingClock();
      
      return new Properties( propertyOptions );
      
    };
    
  };
  
  return EditableProperties;
  
} );