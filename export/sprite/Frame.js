/**
 * 
 * @param id
 * @param options The following options are supported
 *   <ul>
 *     <li>width The width of this frame in a rendered sprite image</li>
 *     <li>height The height of this frame in a rendered sprite image</li>
 *     <li>position An object containing the x and y coordinates of the frame in a rendered sprite image</li>
 *   </ul>
 */
var Frame = function( id, options ) {
  
  this.id = id;
  
  this.width = options.width;
  this.height = options.height;
  
  this.position = options.position;
  
};

exports.Frame = Frame;
