var colourArray = ["#008080", "#2596BE", "#DC143C", "#E5E4E2", "#6551C9"]

function pickRandomColour() {
    var randomColour = colourArray[Math.floor(Math.random() * colourArray.length)];
    return randomColour;
}

console.log(pickRandomColour());

$(document).ready(function(){
	$("#about").hover(function(){
  		$("#about").css("color", pickRandomColour());
    });
    $("#about").mouseleave(function(){
        $("#about").css("color", "white");
    })
});

$(document).ready(function(){
	$("#resume").mouseover(function(){
  		$("#resume").css("color", pickRandomColour());
    });
    $("#resume").mouseleave(function(){
        $("#resume").css("color", "white");
    })
});

$(document).ready(function(){
	$("#contact").mouseover(function(){
  		$("#contact").css("color", pickRandomColour());
    });
    $("#contact").mouseleave(function(){
        $("#contact").css("color", "white");
    })
});

$(document).ready(function(){
	$("#projects").mouseover(function(){
  		$("#projects").css("color", pickRandomColour());
    });
    $("#projects").mouseleave(function(){
        $("#projects").css("color", "white");
    })
});

$(document).ready(function(){
	$("#blog").mouseover(function(){
  		$("#blog").css("color", pickRandomColour());
    });
    $("#blog").mouseleave(function(){
        $("#blog").css("color", "white");
    })
});
