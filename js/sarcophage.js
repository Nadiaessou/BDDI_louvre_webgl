

			var container;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var object;
			var models = [];
			var lights = []

			init();
			animate();


			function init() {

				container = document.getElementById( 'sarcophage3D' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.z = -500;

				// scene

				scene = new THREE.Scene();
				var fogColor = new THREE.Color(0x0d0551);
				scene.fog = new THREE.FogExp2(fogColor, 0.001);
				// LIGHTS

				var intensity = 2.0;
				var distance = 350;
				var decay = 2.0;
				
				var spotLight = new THREE.SpotLight( 0xffffff,1 );
				spotLight.position.set( 2000, 0, 100 );

				spotLight.castShadow = true;

				scene.add( spotLight );

				// var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
				var c1 = 0xffffff, c2 = 0x1133ff, c3 = 0xffffff, c4 = 0x1133ff, c5 = 0xffffff, c6 = 0x1133ff;

				var sphere = new THREE.SphereBufferGeometry( 1, 6, 8 );
				
				// for (let i = 0; i < 50; i++) {
				// 	var lightBubbles = new THREE.PointLight( c1, intensity, distance, decay );
				// 	lightBubbles.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
				// 	lights.push(lightBubbles)
				// 	scene.add( lightBubbles );
				// }

				var light = new THREE.DirectionalLight( 0xfffff, 0.5 );
				scene.add( light );

				light1 = new THREE.PointLight( c1, intensity, distance, decay );
				light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
				scene.add( light1 );

				light2 = new THREE.PointLight( c2, intensity, distance, decay );
				light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
				scene.add( light2 );

				light3 = new THREE.PointLight( c3, intensity, distance, decay );
				light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
				scene.add( light3 );

				light4 = new THREE.PointLight( c4, intensity, distance, decay );
				light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
				scene.add( light4 );

				light5 = new THREE.PointLight( c5, intensity, distance, decay );
				light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
				scene.add( light5 );

				light6 = new THREE.PointLight( c6, intensity, distance, decay );
				light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
				scene.add( light6 );

				var dlight = new THREE.DirectionalLight( 0xffffff, 0.05 );
				dlight.position.set( 0.5, 1, 0 ).normalize();
				scene.add( dlight );
				// manager

				function loadModel() {
					var material = new THREE.MeshLambertMaterial({color: 0x1133ff, roughness: 1, metalness: 0.5, side: THREE.DoubleSide,});
					var specularMaterial = new THREE.MeshPhongMaterial( { color: 0x1133ff, roughness: 0.5, metalness: 0.5, side: THREE.DoubleSide, } );
					var shinningMaterial = new THREE.MeshPhongMaterial( { 
					color: 0x996633,
					// envMap: envMap, // optional environment map
					specular: 0xFFD700,
					shininess: 150
				} ) 
					models.forEach((mod, i) => {
						// mod.traverse( function ( child ) {

						// if ( child.isMesh ) child.material = material;

						// } );

						mod.scale.set(0.2,0.2,0.2 )
						if (i==0) {
							mod.traverse( function ( child ) {

							if ( child.isMesh ) child.material = material;

							} );
							mod.position.y = 0;
							mod.position.x = 0;
							mod.rotation.y = Math.PI/2;
							mod.rotation.z = - Math.PI/2;
							mod.scale = THREE.Vector3(0.2,0.2,0.2 )

							
						}else if (i == 1){
							mod.traverse( function ( child ) {

							// if ( child.isMesh ) child.material = shinningMaterial;

							// } );
							// mod.position.x = 25
							// mod.position.z = 750

							// mod.scale.set(200,200,200)


								if ( child.isMesh ) child.material = specularMaterial;
	
								} );
							mod.position.x = 0
							mod.position.y = 0
							mod.position.z = 1200
							mod.scale.set(0.1,0.1,0.1)
							
						}else if (i == 2){
							mod.traverse( function ( child ) {

							if ( child.isMesh ) child.material = shinningMaterial;

							} );
							mod.position.x = -25 
							mod.position.z = 750
							
						}else if (i == 3){
							mod.traverse( function ( child ) {

							if ( child.isMesh ) child.material = shinningMaterial;

							} );
							mod.position.x = 75
							mod.position.z = 750
							
						}
						else if (i == 4) {
							mod.traverse( function ( child ) {

							if ( child.isMesh ) child.material = shinningMaterial;

							} );
							mod.position.x = -75
							mod.position.z = 650
						}
						else if (i == 5) {
							mod.traverse( function ( child ) {

								if ( child.isMesh ) child.material = specularMaterial;
	
								} );
							mod.position.x = 0
							mod.position.y = 0
							mod.position.z = 1200
							mod.scale.set(0.1,0.1,0.1)
						}
						scene.add( mod );
					});
					// object.traverse( function ( child ) {

					// 	if ( child.isMesh ) child.material = material;

					// } );


					/* DEBOUT */
					// object.position.y = 50;
					// object.rotation.y = Math.PI/2;
					// object.rotation.z = - Math.PI/2;
					// object.scale = THREE.Vector3(0.1,0.1,0.1 )

					// scene.add( object );

				}

				var manager = new THREE.LoadingManager( loadModel );

				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

				// texture

				var textureLoader = new THREE.TextureLoader( manager );

				var texture = textureLoader.load( 'js/three/UV_Grid_Sm.jpg' );

				// model

				function onProgress( xhr ) {

					if ( xhr.lengthComputable ) {

						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				}

				function onError() {}

				var loader = new THREE.OBJLoader( manager );
				var modelsPath = ['js/obj/sarcophage.obj', 'js/obj/anubis.obj']
				// var modelsPath = ['js/obj/sarcophage.obj', 'js/obj/hieroglyphes_coeur.obj', 'js/obj/hieroglyphes_plume.obj', 'js/obj/hieroglyphes_arbre.obj', 'js/obj/hieroglyphes_noeud.obj', 'js/obj/anubis.obj']
				modelsPath.forEach(mod => {
					loader.load( mod, function ( obj ) {
						models.push(obj)
						object = obj;
					}, onProgress, onError );
				});

				// loader.load( 'js/obj/sarcophage.obj', function ( obj ) {

				// 	object = obj;

				// }, onProgress, onError );

				//

				renderer = new THREE.WebGLRenderer({ alpha: true });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener('wheel', onMouseWheel)
				//

				window.addEventListener( 'resize', onWindowResize, false );
				addRiver()
			}
			function addRiver(){
				
				var geometry1 = new THREE.PlaneBufferGeometry( 200, 20000, 32 );
				var material = new THREE.MeshBasicMaterial( {color: 0x1133ff, side: THREE.DoubleSide, transparent: true,  opacity: 0.5} );
				var plane = new THREE.Mesh( geometry1, material );
				plane.rotation.x = - Math.PI/-2;
				plane.position.y -= 80

				scene.add( plane );
				
			}
			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
			function onMouseWheel(e){

				if (e.deltaY > 0) {
					camera.position.z += 50
					models[0].position.z += 50
				}else
				if (e.deltaY < 0) {
					camera.position.z -= 50
					models[0].position.z -= 50
				} 
			}
			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {
				requestAnimationFrame( animate );
				render();
				anubis();
			}




				/*** pivoter le sarcophage ***/
				var button_go = document.getElementById('button_go');
				var button_commence = document.getElementById('commence');
				var bloc = document.getElementById('bloc');
				var cadre = document.getElementById('cadre');
				var scroll = document.getElementById('scroller');

				button_commence.onclick = function(){
					models[0].position.z -= 300;
					// object.position.x -= 100;
				}

				button_go.onclick = function(){
					bloc.style.display = "none";
					button_go.style.display = "none";
					scroll.style.animation = "fondu 3s";

					/* ALLONGE */
					camera.position.y = -300;
					camera.position.x = 1000;

					models[0].position.y -= 100;
					models[0].rotation.y = 300;
					models[0].rotation.x = 0;
					models[0].rotation.z = Math.PI/6;
				}

			/*********** APPARITION ANUBIS ***********/
				var cadre = document.getElementById('cadre');

				function anubis(){
					if (camera.position.z == 1000){
						cadre.style.backgroundSize = "100% 90vh";
						cadre.style.left = "4vh";
						cadre.style.right = "4vh";
						cadre.style.top = "5vh";

						/* phrase 1 */
						setTimeout(function() { 
							$('.phrase6').fadeIn();
							$('.interlocuteur').fadeIn();
						}, 1000);
						setTimeout(function() { 
							$('.phrase6').fadeOut(); 
						}, 7000); 
						
						/* phrase 2 */
						setTimeout(function() { 
							$('.phrase7').fadeIn();
						}, 7300); 
						
						setTimeout(function() { 
							$('.phrase7').fadeOut(); 
						}, 14500);
						
						/* phrase 3 */
						setTimeout(function() { 
							$('.phrase8').fadeIn();
						}, 14800);
						
						setTimeout(function() { 
							$('.phrase8').fadeOut(); 
							$('.interlocuteur').fadeOut(); 
						}, 21800);

						setTimeout(function() { 
							$('#jeu').fadeIn();
						}, 22100);
						
					}
				}


			function render() {

				
				camera.position.x = ( mouseX - camera.position.x ) * .01;
				camera.position.y = ( - mouseY - camera.position.y ) * .01;
				// camera.position.x += ( mouseX - camera.position.x ) * .05;
				// camera.position.y += ( - mouseY - camera.position.y ) * .05;

			

				camera.lookAt( 0,0,99999 );
				camera.updateMatrixWorld();

				var time = Date.now() * 0.00025;
				var d = 150;


				lights.forEach(l => {
					l.position.x = Math.sin( time * 09  ) * d;
					l.position.z = Math.cos( time * 0.3  ) * d;
					l.position.y = Math.sin( time * 0.7  ) * d;
				});

				light1.position.x = Math.sin( time * 0.7 ) * d;
				light1.position.z = Math.cos( time * 0.3 ) * d;
				light1.position.y = Math.sin( time * 0.7 ) * d;

				light2.position.x = Math.cos( time * 0.3 ) * d;
				light2.position.z = Math.sin( time * 0.7 ) * d;
				light2.position.y = Math.sin( time * 0.3 ) * d;

				light3.position.x = Math.sin( time * 0.7 ) * d;
				light3.position.z = Math.sin( time * 0.5 ) * d;
				light3.position.y = Math.sin( time * 0.5 ) * d;

				light4.position.x = Math.sin( time * 0.3 ) * d;
				light4.position.z = Math.sin( time * 0.5 ) * d;
				light4.position.y = Math.sin( time * 0.5 ) * d;

				light5.position.x = Math.cos( time * 0.3 ) * d;
				light5.position.z = Math.sin( time * 0.5 ) * d;
				light5.position.y = Math.sin( time * 0.5 ) * d;

				light6.position.x = Math.cos( time * 0.7 ) * d;
				light6.position.z = Math.cos( time * 0.5 ) * d;
				light6.position.y = Math.cos( time * 0.5 ) * d;



				renderer.render( scene, camera );


			}








