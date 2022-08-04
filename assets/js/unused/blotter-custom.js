

var blotterMaterial = new Blotter.ChannelSplitMaterial();

blotterMaterial.uniforms = {

    uOffset : { type : "1f", value : 0.0 },

    uRotation : { type : "1f", value : 45.0 },

    uApplyBlur : { type : "1f", value : 1.0 },

    uAnimateNoise : { type : "1f", value : 1.0 }

};

var blotterTitle = function (){

    var titleContainer = document.getElementsByClassName( "project-title" );
    var projectTitle = document.getElementById( "projectTitle" );
    var titleHTML;
    var subtitleHTML;
    
    if (titleContainer) {
    
        var text = new Blotter.Text( projectTitle.innerHTML, {

            family:         "FuturaPT-Bold",
            size:           remUnits(6.85),
            leading:        1,
            fill:           "#212121",
            weight:         700,
            paddingTop:     remUnits(6.85),
            paddingRight:   remUnits(6.85),
            paddingBottom:  remUnits(6.85),
            paddingLeft:    remUnits(6.85)

        });


        text.needsUpdate = true

        blotterMaterial.needsUpdate = true;

        var blotter = new Blotter( blotterMaterial, { texts : text , ratio: 1.0 });

        var scope = blotter.forText( text );

        scope.appendTo( titleContainer[0] );

        blotter.start();

    }
    else {}

};

document.fonts.ready.then( blotterTitle() ); 

