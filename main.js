status2 = '';
var objects = [];
song = ''


function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML='Now Status > Detecting';
}

function preload(){
    song = loadSound('smallname.wav');
}

function modelLoaded(){
    console.log('Cocossd Is Cocossd :O');
    status2 = true;
}

function gotResult(error, results){
    if(error){
        console.log(error)
        return;
    }
    console.log(results)
    objects = results;
    
}
function draw(){
    image(video, 0, 0, 400, 400)
    if(status2 != ''){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById('status').innerHTML = 'Status: Object Detected';
            fill('#FF0000');
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + ' ' + percent + '%', objects[i].x, objects[i].y);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height );
            if(objects[i].label == 'person')
            {
                document.getElementById('number_of_objects').innerHTML = 'Baby found!';
                console.log('stop');
                song.stop();
            }
            else{
                document.getElementById('number_of_objects').innerHTML = 'Baby not found! NOW LOSE YOUR EARS';
                console.log('play');
                song.play();
            }
        }
        if(objects.length == 0){
            document.getElementById('number_of_objects').innerHTML = 'Baby not found! NOW LOSE YOUR EARS';
            console.log('play');
            song.play();
        }
    }
    
    
    }