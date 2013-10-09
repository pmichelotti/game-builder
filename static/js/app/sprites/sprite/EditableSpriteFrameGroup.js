define( [ 'sprite/SpriteFrameGroup' ], function( SpriteFrameGroup ) {

	var EditableSpriteFrameGroup = function( spriteFrameGroup ) {

		var self = this;

		this.spriteFrameGroup = spriteFrameGroup;

		this.name = ko.observable( spriteFrameGroup.name );

		this.spriteFrames = ko.observableArray( spriteFrameGroup.spriteFrames );

		this.addSpriteFrame = function( spriteFrame ) {
			self.spriteFrames.push( spriteFrame );

			return spriteFrame;
		};

		this.removeSpriteFrame = function( spriteFrame ) {
			var newSpriteList = Array();

			self.spriteFrames().forEach( function( curSpriteFrame ) {
				if ( curSpriteFrame !== spriteFrame ) {
					newSpriteList.push( curSpriteFrame );
				}
			} );

			self.spriteFrames.removeAll();

			newSpriteList.forEach( function( curSpriteFrame ) {
				self.spriteFrames.push( curSpriteFrame );
			} );

			return spriteFrame;
		};

		this.updateSpriteFrame = function( spriteFrame ) {
			var newSpriteList = Array();

			self.spriteFrames().forEach( function( curSpriteFrame ) {
				if ( curSpriteFrame.id === spriteFrame.id ) {
					newSpriteList.push( spriteFrame );
				}
				else {
					newSpriteList.push( curSpriteFrame );
				}
			} );

			self.spriteFrames.removeAll();

			newSpriteList.forEach( function( curSpriteFrame ) {
				self.spriteFrames.push( curSpriteFrame );
			} );

			return spriteFrame;
		};

		this.save = function() {
			return new SpriteFrameGroup( self.spriteFrameGroup.id, {
				name : self.name(),
				spriteFrames : self.spriteFrames()
			} );
		};

	};

	return EditableSpriteFrameGroup;

} );