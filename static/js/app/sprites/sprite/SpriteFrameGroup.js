define( [], function() {

	var SpriteFrameGroup = function( id, options ) {

		var self = this;

		options = options || {};

		this.id = id;
		this.name = options.name || id;

		this.spriteFrames = options.spriteFrames || Array();

		this.toJSON = function() {

			var retObject = {};

			retObject[ 'id ' ] = self.id;
			retObject[ 'name' ] = self.name;

			/*
			 * Only the sprite frame IDs are included in the JSON sprite frame array.  This
			 * models the fact that groups are just a set of sprite references
			 */
			retObject[ 'spriteFrames' ] = Array();

			self.spriteFrames.forEach( function( curSpriteFrame ) {
				retObject[ 'spriteFrames' ].push( curSpriteFrame.id );
			} );

			return retObject;
		};

	};

	return SpriteFrameGroup;

} );