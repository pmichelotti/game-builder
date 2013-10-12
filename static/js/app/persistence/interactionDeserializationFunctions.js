define( [ 'interactions/Interaction', 'interactions/InteractionMapping' ], function( Interaction, InteractionMapping ) {
  
  var createInteractionMappingFromJson = function( json ) {
    return new InteractionMapping( json.type, json.identifier );
  };
  
  var createInteractionMappingsFromJson = function( json ) {
    
    var retMappings = Array();
    
    if ( json && json.length ) {
    
      json.forEach( function( curMappingJson ) {
        retMappings.push( createInteractionMappingFromJson( curMappingJson ) );
      } );
    }
    
    return retMappings;
  };
  
  var createInteractionFromJson = function( json ) {
    
    return new Interaction( json.id, json.name, createInteractionMappingsFromJson( json.mappings ) );
    
  };
  
  return {
    makeInteraction : createInteractionFromJson
  };
  
} );