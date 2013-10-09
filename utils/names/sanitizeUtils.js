
var sanitizeForFolderNameRegex = /[^\w-]/g;

var sanitizeForFolderName = function( name ) {
  return name.replace( sanitizeForFolderNameRegex, '-' );
};

exports.sanitizeForFolderName = sanitizeForFolderName;
