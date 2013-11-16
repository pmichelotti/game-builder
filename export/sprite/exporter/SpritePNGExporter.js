var PNG = require( 'pngjs' ).PNG;
var fs = require( 'fs' );

var cleanHex = function( hex ) {
  
  if ( hex.indexOf ( '#' ) === 0 ) {
    return hex.substring( 1 );
  }
  
  return hex;
  
};

var hexToRGB = function( hex ) {
  
  var hexToProcess = cleanHex( hex );
  
  var rHex = hexToProcess.substring( 0, 2 );
  var gHex = hexToProcess.substring( 2, 4 );
  var bHex = hexToProcess.substring( 4, 6 );
  
  
  return {
    r : parseInt( rHex, 16 ), 
    g : parseInt( gHex, 16 ), 
    b : parseInt( bHex, 16 )
  };
  
};

function decToHex ( number ){
  
  return '0x' + ( Math.floor( number ) ).toString( 16 );
  
}
  
/**
 * 
 * @spriteJson
 * 
 *   spriteFrames
 *     pixels - A matrix of pixels.  The first level of arrays represents rows, or x, the second represents columns, or y.  
 *     
 * @param callback A function which will take as input a JSON object representing the exported sprite and a string representing 
 *        the file location where the sprite was saved. 
 */
var exporter = function( spriteJson, fileName, callback ) {
    
    console.log( 'SpritePNGExporter.exporter : Exporting ' + spriteJson.id + ' to ' + fileName );
    
    var retSpriteJson = {};
    
    retSpriteJson[ 'id' ] = spriteJson.id;
    retSpriteJson[ 'frames' ] = {};
    
    var renderedWidth = 0;
    var renderedHeight = 0;
    
    var pixels = Array();
    
    /*
     * Calculate the height and width of the final rendered PNG
     */
    spriteJson.spriteFrames.forEach( function( curFrameJson ) {
      
      var spriteFrameWidth = curFrameJson.pixels.length * curFrameJson.pixelSize;
      var spriteFrameHeight = curFrameJson.pixels[ 0 ].length * curFrameJson.pixelSize;

      renderedHeight = renderedHeight + spriteFrameHeight;

      if ( spriteFrameWidth > renderedWidth ) {
        renderedWidth = spriteFrameWidth;
      }
      
      /*
       * Construct a JSON representation of the sprite frame and store it in the sprite's frame map
       */
      retSpriteFrame = {};
      retSpriteFrame[ 'id' ] = curFrameJson.id;
      retSpriteFrame[ 'width' ] = spriteFrameWidth;
      retSpriteFrame[ 'height' ] = spriteFrameHeight;
      retSpriteFrame[ 'image' ] = fileName;
      retSpriteFrame[ 'position' ] = {
          x : 0, 
          y : pixels.length
      };
      
      retSpriteJson[ 'frames' ][ curFrameJson.id ] = retSpriteFrame;
      
      /*
       * Transform the abstract sprite representation into a concrete pixel representation 
       */
      for ( var y = 0; y < spriteFrameHeight; y++ ) {
        var curRowPixels = Array();
        
        for ( var x = 0; x < spriteFrameWidth; x++ ) {
          var curSpriteX = Math.floor( x / curFrameJson.pixelSize );
          var curSpriteY = Math.floor( y / curFrameJson.pixelSize );
          
          var curPixelColor = curFrameJson.pixels[ curSpriteX ][ curSpriteY ].color;
          var curPixelOpacity = curFrameJson.pixels[ curSpriteX ][ curSpriteY ].opacity;
          
          var pixelRgb = hexToRGB( curPixelColor );
          var renderedPixelOpacity = 255 * curPixelOpacity;
          
          curRowPixels.push(
              {
                r : pixelRgb.r, 
                g : pixelRgb.g, 
                b : pixelRgb.b, 
                a : renderedPixelOpacity
              }
          );
        }
        
        pixels.push( curRowPixels );
      }
      
    } );
    
    var outputPng = new PNG( { 
      width : renderedWidth, 
      height : renderedHeight,
      filterType : -1 } );
    
    /*
     * Go through the renderable pixels outputting each to the PNG
     */
    for ( var y = 0; y < pixels.length; y++ ) {
      
      var curRow = pixels[ y ];
      
      for ( var x = 0; x < curRow.length; x++ ) {
        
        var curPixel = curRow[ x ];
        
        var idx = ( outputPng.width * y + x ) << 2;
        outputPng.data[ idx ] = decToHex( curPixel.r );
        outputPng.data[ idx + 1 ] = decToHex( curPixel.g );
        outputPng.data[ idx + 2 ] = decToHex( curPixel.b );
        outputPng.data[ idx + 3 ] = decToHex( curPixel.a );

      }
      
    }
    
    
    console.log( 'SpritePNGExporter.exporter : Writing rendered PNG to file' );
    
    /*
     * Write the rendered PNG to file
     */
    var spriteWriteStream = fs.createWriteStream( fileName );
    var packedPng = outputPng.pack();
    
    packedPng.on( 'end', function() {
      
      console.log( 'SpritePNGExporter.exporter : Write completed' );
      
      if ( callback ) {
        console.log( 'SpritePNGExporter.exporter : Completed processing sprite file ' + fileName );
        callback( retSpriteJson, fileName );
      }
      
    } );
    
    spriteWriteStream.on( 'error', function( err ) {
      console.log( 'SpritePNGExporter.exporter : Error encountered writing file ' + fileName + ' :: ' + err );
    } );
    
    packedPng.pipe( spriteWriteStream );
    
};
  
exports.exporter = exporter;
