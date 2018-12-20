

			var container;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var object;
			var lights = []

			init();
			animate();


			function init() {

				container = document.getElementById( 'sarcophage3D' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
				camera.position.z = -970;

				// scene

				scene = new THREE.Scene();

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

					object.traverse( function ( child ) {

						if ( child.isMesh ) child.material = material;

					} );


					/* DEBOUT */
					object.position.y = 50;
					object.rotation.y = Math.PI/2;
					object.rotation.z = - Math.PI/2;
					object.scale = THREE.Vector3(0.1,0.1,0.1 )

					scene.add( object );

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

				loader.load( 'js/obj/sarcophage.obj', function ( obj ) {

					object = obj;

				}, onProgress, onError );

				//

				renderer = new THREE.WebGLRenderer({ alpha: true });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {
				requestAnimationFrame( animate );
				render();

			}






			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				// camera.position.y += ( - mouseY - camera.position.y ) * .05;

				let timer = Date.now() / 1000;



				/*** pivoter le sarcophage ***/
				var button_go = document.getElementById('button_go');
				var bloc = document.getElementById('bloc');
				var cadre = document.getElementById('cadre');

				button_go.onclick = function(){
					bloc.style.display = "none";
					button_go.style.display = "none";

					/* ALLONGE */
					camera.position.y = -300;
					camera.position.x = 1000;
					
					object.position.y = -200;
					object.rotation.y = 300;
					object.rotation.x = 0;
					object.rotation.z = Math.PI/6;

					// cadre.style.backgroundSize = "100% 90vh";
					// cadre.style.left = "4vh";
					// cadre.style.right = "4vh";
					// cadre.style.top = "5vh";
				}



				camera.lookAt( scene.position );

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

