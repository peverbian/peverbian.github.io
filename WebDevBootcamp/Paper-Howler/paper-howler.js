var keyData {
	a: { 
		color: "red",
		sound = new Howl({src: ['assets/sounds/bubbles.mp3']});
	}
	s: { 
		color: "red",
		sound = new Howl({src: ['assets/sounds/clay.mp3']});
	}
	d: { 
		color: "red",
		sound = new Howl({src: ['assets/sounds/confetti.mp3']});
	}
};

	<script type="text/paperscript" canvas="myCanvas">
	var myData {
		a: { 
			color: "red",
			sound = new Howl(["assets/sounds/bubbles.mp3"]);
		}
		s: { 
			color: "red",
			sound = new Howl(["assets/sounds/clay.mp3"]);
		}
		d: { 
			color: "red",
			sound = new Howl(["assets/sounds/confetti.mp3"]);
		}
	};
	var circles = [];

	function onKeyDown(event) {
		if(myData[event.key]) {
			var maxPoint = new Point(view.size.width, view.size.height);
			var circ = new Path.Circle(maxPoint * Point.random(),Math.random()*150);
			circ.fillColor = myData[event.key].color;
			circles.push(circ);
			myData[event.key].sound.play();
		}

	}
	
	function onFrame(event) {
		for(var i=0; i < circles.length; i++) {
			circles[i].scale(0.95);
		}
	}
	</script>