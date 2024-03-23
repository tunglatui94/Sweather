let map;
  let marker;

  function initMap() {
    const buildingLocation = { lat: 60.170029, lng: 24.938554 }
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: buildingLocation,
    });

    // Building Icon
    const buildingIconUrl = 'https://cdn-icons-png.flaticon.com/512/562/562460.png';
    const buildingIcon = {
      url: buildingIconUrl,
      scaledSize: new google.maps.Size(32, 32), // Adjust the size as needed
    }

    marker = new google.maps.Marker({
      position: buildingLocation,
      map: map,
      icon: buildingIcon
    });

    // Comment Icon
    const commentIconUrl = 'https://cdn-icons-png.flaticon.com/512/7729/7729543.png';
    const commentIcon = {
      url: commentIconUrl,
      scaledSize: new google.maps.Size(32, 32), // Adjust the size as needed
    }
    const commentLocation = { lat: 60.169428, lng: 24.933322 }
    commentMarker = new google.maps.Marker({
      position: commentLocation,
      map: map,
      icon: commentIcon
    });

    const commentWindow = new google.maps.InfoWindow({
      content: "<div>It's slippery</div>",
    });

    commentMarker.addListener("click", () => {
      commentWindow.open(map, commentMarker);
    });

    // Picture Icon
    const pictureIconUrl = 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png';
    const pictureIcon = {
      url: pictureIconUrl,
      scaledSize: new google.maps.Size(32, 32), // Adjust the size as needed
    }
    const pictureLocation = { lat: 60.168866, lng: 24.941902 }
    pictureMarker = new google.maps.Marker({
      position: pictureLocation,
      map: map,
      icon: pictureIcon
    });

    const picWindow = new google.maps.InfoWindow({
      content: "<img class='marker-picture' src='https://i.ytimg.com/vi/4Ygw4pqGQ3c/maxresdefault.jpg' />",
    });

    pictureMarker.addListener("click", () => {
        picWindow.open(map, pictureMarker);
    });

    // Add a polyline with red and green segments
    const polylineRed = new google.maps.Polyline({
      path: [
        { lat: 60.170029, lng: 24.938554 }, 
        { lat: 60.168585, lng: 24.934586 }, 
        { lat: 60.169428, lng: 24.933322 }, 
      ],
      geodesic: true,
      strokeColor: "#FF0000", // Red color
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: map,
    });

    // Add a polyline with red and green segments
    const polylineGreen = new google.maps.Polyline({
      path: [
        { lat: 60.170029, lng: 24.938554 }, 
        { lat: 60.170282, lng: 24.939557 },
        { lat: 60.170325, lng: 24.941239 }
      ],
      geodesic: true,
      strokeColor: "#31e931", // Green color
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: map,
    });
    // Add a polyline with red and green segments
    const polylineGreenTwo = new google.maps.Polyline({
      path: [
        { lat: 60.170029, lng: 24.938554 }, 
        { lat: 60.170436, lng: 24.939848 },
        { lat: 60.170526, lng: 24.941514 }, 
        { lat: 60.170880, lng: 24.941479 },
      ],
      geodesic: true,
      strokeColor: "#31e931", // Green color
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: map,
    });

    // Custom styling for the road nearby the marker
    const roadStyle = [
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ hue: "#00ff00" }, { saturation: -100 }],
      },
    ];

    const mapType = new google.maps.StyledMapType(roadStyle, { name: "Road" });
    map.mapTypes.set("road", mapType);
    map.setMapTypeId("road");
  }

  new Vue({
    el: '#app',
    data: {
      step: 1,
      // In the future, the value for the weather will come from selected forecast agency API
      weather: {
        temperature: -20,
        condition: 'Snow storm',
        wind: 10,
        humidity: 50,
        sunrise: '06:00 AM',
        sunset: '06:00 PM',
        background: 'https://i1.pickpik.com/photos/654/108/40/ice-stars-winter-snow-preview.jpg',
        alert: true,
        userPhoto: 'https://www.trvbox.com/wp-content/uploads/2019/02/helsinki-cathedral.jpg',
        userName: 'theStudentHOAS'
      },
      currentQuestionIndex: 0,
      answers: ['', '', '']

    },
    methods: {
      nextStep() {
        this.step++;
      },
      submitAnswers() {
        // Logic to submit answers goes here
      },
      submit() {
        // Handle submission here (e.g., send data to server)
        console.log('Final Answers:', this.answers);
      },
      selectAnswer(answer) {
        this.answers[this.currentQuestionIndex] = answer;
        // Move to the next question if current answer is selected
        if (this.answers[this.currentQuestionIndex] !== '') {
          this.currentQuestionIndex++;
        }
      },
    },
    watch: {
      answers: {
        handler(newAnswers) {
          // Move to the next question if current answer is selected
          if (newAnswers[this.currentQuestionIndex] !== '') {
            this.currentQuestionIndex++;
          }
        },
        deep: true
      }
    }
  });