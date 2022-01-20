peter_pan = "";
disney = "";
right_wristx = 0;
right_wristy = 0;
right_wrist_score = 0;
left_wristx= 0;
left_wristy= 0;
left_wrist_score = 0;
Disney_play_status = "";
PP_play_status = "";

function preload(){
    disney = loadSound("Disney_music.mp3");
    peter_pan = loadSound("peter_pan.mp3");
}

function setup(){
    canvas =  createCanvas(450,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(450,400);
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotResults);
}

function modelLoaded(){
    console.log("model is loaded");
}

function gotResults(result){
    if(result.length > 0){
        console.log(result);
        left_wristx = result[0].pose.leftWrist.x;
        left_wristy = result[0].pose.leftWrist.y;
        left_wrist_score = result[0].pose.keypoints[9].score;
        right_wrist_score = result[0].pose.keypoints[10].score;
        right_wristx = result[0].pose.rightWrist.x;
        right_wristy = result[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video,0,0,450,400);
    fill("red");
    stroke("red");
    rect( 225, 0, 1, 500);
    peter_pan.isPlaying();
    
    if(left_wrist_score > 0.2){
        circle(left_wristx,left_wristy,20);
        disney.stop();
        peter_pan.stop();
        if(PP_play_status == false){
            peter_pan.play();
            document.getElementById("songName").innerHTML = "Song Name: Peter Pan";
        }
    }
    disney.isPlaying();
    if(right_wrist_score > 0.2){
        circle(right_wristx,right_wristy,20);
        peter_pan.stop();
        disney.stop();
        if(Disney_play_status == false){
            disney.play();
            document.getElementById("songName").innerHTML = "Song Name: Disney";
        }
    }
}

