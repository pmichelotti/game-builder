define( [], function() {

	var Sprite = function( id, options ) {

		var self = this;

		options = options || {};

		this.id = id;

		this.name = options.name || id;

		this.spriteFrames = options.spriteFrames || Array();
		this.spriteFrameGroups = options.spriteFrameGroups || Array();
		this.labels = options.labels || Array();

		this.frameCount = this.spriteFrames.length;
		this.frameGroupCount = this.spriteFrameGroups.length;

		this.toJSON = function() {

			var retObject = {};

			retObject[ 'id' ] = self.id;
			retObject[ 'name' ] = self.name;
			retObject[ 'spriteFrames' ] = Array();
			retObject[ 'spriteFrameGroups' ] = Array();
			retObject[ 'labels' ] = Array();

			self.spriteFrames.forEach( function( curSpriteFrame ) {
				retObject[ 'spriteFrames' ].push( curSpriteFrame.toJSON() );
			} );

			self.spriteFrameGroups.forEach( function( curSpriteFrameGroup ) {
				retObject[ 'spriteFrameGroups' ].push( curSpriteFrameGroup.toJSON() );
			} );

			self.labels.forEach( function( curLabel ) {
				retObject[ 'labels' ].push( curLabel );
			} );

			return retObject;

		};

	};

	return Sprite;

} );