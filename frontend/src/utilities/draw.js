// from https://github.com/tensorflow/tfjs-models/blob/b5d49c0f5ba2057cc29b40317126c5f182495f96/posenet/demo/demo_util.js
import * as posenet from '@tensorflow-models/posenet';
// import * as tf from '@tensorflow/tfjs-core';
import { createExportAssignment } from 'typescript';

// import * as poseDetection from '@tensorflow-models/pose-detection';
const color = "red";
const lineWidth = 8;

function toTuple({y, x}) {
  return [y, x];
}

//  Draws a point
function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// Draws a line on a canvas, i.e. a joint
function drawSegment([ay, ax], [by, bx], color, scaleX, scaleY, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scaleX, ay * scaleY);
  ctx.lineTo(bx * scaleX, by * scaleY);
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

//  Draws a pose skeleton by looking up all adjacent keypoints/joints
function drawSkeleton(keypoints, minConfidence, ctx, scaleX, scaleY) {
  const adjacentKeyPoints =
      posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), color,
        scaleX, scaleY, ctx);
  });
}

// Draw pose keypoints onto a canvas
export function drawKeypoints(keypoints, minConfidence, ctx, scaleX, scaleY) {
  for (let i = 0; i < keypoints.length; i++) {
    if(i<3){
      continue;
    }
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const {y, x} = keypoint.position;
    drawPoint(ctx, y * scaleY, x * scaleX, 3, color);
  }
}

// ————————————————————————————————————————————————————————————————————————————————
 
//  functions to calculate 
function radToDeg(rad) {
    return rad / (Math.PI / 180);
}

export function findAngle(p1,p2,p3){
  const position1= [p1.y,p1.x];
  const position2= [p2.y,p2.x];
  const position3= [p3.y,p3.x];
  let  angle = radToDeg(Math.atan2(position3[0]-position2[0], position3[1]-position2[1]) - 
  Math.atan2(position1[0]-position2[0], position1[1]-position2[1]));
  if (angle < 0){
    angle+=360;
    if (angle>180){
      angle=360-angle;
    }
  }else if (angle>180){
    angle=360-angle;
  }
  return angle;
}

export function findDistance(p1,p2){
  const position1= [p1.y,p1.x];
  const position2= [p2.y,p2.x];
  let xDistance= Math.abs(position1[1]-position2[1]);
  let yDistance= Math.abs(position1[0]-position2[0]);
  let euclideanDistance= Math.sqrt(xDistance*xDistance+yDistance*yDistance);
  return euclideanDistance;
}

//Conditions:
let elbowMin=65
let elbowMax=165
let shoulderMin= 50
let shoulderMax=60
let hipMin= 160

//indicators:
let count = 0
let direction = 0
let form = 0
let feedback = "Begin"
let specificFeedbackPU= {
  elbow: false,
  shoulder:false,
  hip:false
};

let shoulderAngle=0;
let hipAngle=0;
let elbowAngle=0;

let ear= null;
let ankle= null

export function drawSkeletonPushUps(keypoints, minConfidence, ctx, scaleX, scaleY) {
  let shoulder= keypoints[5].score>minConfidence?keypoints[5].position:(keypoints[6].score>minConfidence?keypoints[6].position:null);

  let elbow= keypoints[7].score>minConfidence?keypoints[7].position:(keypoints[8].score>minConfidence?keypoints[8].position:null);
  
  let wrist = keypoints[9].score>minConfidence?keypoints[9].position:(keypoints[10].score>minConfidence?keypoints[10].position:null);
  
  let hip = keypoints[11].score>minConfidence?keypoints[11].position:(keypoints[12].score>minConfidence?keypoints[12].position:null);
  
  let knee = keypoints[13].score>minConfidence?keypoints[13].position:(keypoints[14].score>minConfidence?keypoints[14].position:null);

  if (wrist && elbow && shoulder){
    drawSegment([wrist.y, wrist.x],[elbow.y, elbow.x],color,scaleX, scaleY,ctx);
    drawSegment([elbow.y, elbow.x],[shoulder.y, shoulder.x],color,scaleX, scaleY,ctx);
    elbowAngle= findAngle(wrist,elbow,shoulder);
  }
  if (shoulder && hip && elbow ){
    shoulderAngle= findAngle(elbow,shoulder,hip);
  }
  if (shoulder && hip && knee){
    drawSegment([hip.y, hip.x],[knee.y, knee.x],color,scaleX, scaleY,ctx);
    drawSegment([hip.y, hip.x],[shoulder.y, shoulder.x],color,scaleX, scaleY,ctx);
    hipAngle= findAngle(shoulder,hip,knee);
  }
  //Check to ensure right form before starting the program
  if (form==0){
    specificFeedbackPU.shoulder= shoulderAngle<shoulderMax?false:true;
    specificFeedbackPU.hip= hipAngle<hipMin?false:true;
    specificFeedbackPU.elbow= elbowAngle<elbowMax?false:true;
    if (specificFeedbackPU.shoulder && specificFeedbackPU.elbow && specificFeedbackPU.hip){
        form=1;
        feedback = "Start";
      }
    }
  if (shoulder && elbow && wrist && hip && knee){
    if (form == 1){
      if (direction==0){
        feedback = "Down";
        specificFeedbackPU.shoulder= shoulderAngle>shoulderMin?false:true;
        specificFeedbackPU.hip= hipAngle<hipMin?false:true;
        specificFeedbackPU.elbow= elbowAngle>elbowMin?false:true;
        if (specificFeedbackPU.shoulder && specificFeedbackPU.elbow && specificFeedbackPU.hip){
          count += 0.5;
          direction = 1;
        }
      }
      if (direction==1){
        feedback = "Up";
        specificFeedbackPU.shoulder= shoulderAngle<shoulderMax?false:true;
        specificFeedbackPU.hip= hipAngle<hipMin?false:true;
        specificFeedbackPU.elbow= elbowAngle<elbowMax?false:true;
        if (specificFeedbackPU.shoulder && specificFeedbackPU.elbow && specificFeedbackPU.hip){
          count += 0.5;
          direction = 0;
        }
      }
    }
  }
  // console.log(elbowAngle,shoulderAngle,hipAngle);
  // console.log("feedback is %s", feedback);
  // console.log("elbow is %s, Shoulder is %s and hip is %s", specificFeedbackPU.elbow, specificFeedbackPU.shoulder, specificFeedbackPU.hip);
  // console.log("count is %d", count);
  return [count, feedback, specificFeedbackPU];
}


//Data for situps
// shoulderBlade angle - 3,5,15 
// butt angle- 5,11,13
// knee angle- 11,13,15
// earcup distance- 3,9
// touchKnee distance- 7,13
form=0;
// Conditions:
let shoulderBladeMin= 150
let buttStart=150
let buttEnd= 100
let kneeMin= 120
let earCupMin= 50 //need to recalibrate as using euclidean distance
let touchKneeMin=50 //need to recalibrate as using euclidean distance

let specificFeedbackSU= {
  cupEars: false,//throughout
  butt: false, //throughout
  kneePosition: false,//throughout
  touchKnees: false,///;going up
  flattenShoulder:false //going down
};
let earCupDistance=10000;
let touchKneeDistance=1000;
let shoulderBladeAngle=null;
let buttAngle=null;
let kneeAngle=null;

export function drawSkeletonSitUps(keypoints, minConfidence, ctx, scaleX, scaleY) {
  shoulder= keypoints[5].score>minConfidence?keypoints[5].position:null;
  elbow= keypoints[7].score>minConfidence?keypoints[7].position:null;
  wrist= keypoints[9].score>minConfidence?keypoints[9].position:null;
  hip= keypoints[11].score>minConfidence?keypoints[11].position:null;
  knee= keypoints[13].score>minConfidence?keypoints[13].position:null;
  ear= keypoints[3].score>minConfidence?keypoints[3].position:null;
  ankle= keypoints[15].score>minConfidence?keypoints[15].position:null;
  
  if (ear && wrist){
    earCupDistance= findDistance(ear,wrist);
  }
  if (knee && wrist){
    touchKneeDistance= findDistance(ear,wrist);
  }
  if (ear && shoulder && ankle){
    drawSegment([ear.y, ear.x],[shoulder.y, shoulder.x],color,scaleX, scaleY,ctx);
    drawSegment([ankle.y, ankle.x],[shoulder.y, shoulder.x],color,scaleX, scaleY,ctx);
    shoulderBladeAngle= findAngle(ear,shoulder,ankle);
  }
  if (hip && shoulder && ankle){
    drawSegment([hip.y, hip.x],[shoulder.y, shoulder.x],color,scaleX, scaleY,ctx);
    buttAngle= findAngle(shoulder,hip,ankle);
  }
  if (hip && knee && ankle){
    drawSegment([hip.y, hip.x],[knee.y, knee.x],color,scaleX, scaleY,ctx);
    drawSegment([knee.y, knee.x],[ankle.y, ankle.x],color,scaleX, scaleY,ctx);
    kneeAngle= findAngle(hip,knee,ankle);
  }
  //Check to ensure right form before starting the program
  if (form==0){
    specificFeedbackSU.flattenShoulder= shoulderBladeAngle<shoulderBladeMin?false:true;
    specificFeedbackSU.butt= buttAngle<buttStart?false:true;
    specificFeedbackSU.cupEars= earCupDistance>earCupMin?false:true;
    specificFeedbackSU.kneePosition= kneeAngle>kneeMin?false:true;
    if (specificFeedbackSU.flattenShoulder && specificFeedbackSU.butt && specificFeedbackSU.cupEars && specificFeedbackSU.kneePosition){
      form=1;
      feedback= "Start";
    }
  }
  if (shoulder && elbow && wrist && hip && knee && ankle){
    if (form ==1){
      if (direction==0){
        feedback= "Up";
        specificFeedbackSU.butt= buttAngle>buttEnd?false:true;
        specificFeedbackSU.cupEars= earCupDistance>earCupMin?false:true;
        specificFeedbackSU.touchKnees= touchKneeDistance>touchKneeMin?false:true;
        if (specificFeedbackSU.butt && specificFeedbackSU.cupEars && specificFeedbackSU.touchKnees){
          count += 0.5
          direction = 1
        }
      }
      if (direction==1){
        feedback= "Down";
        specificFeedbackSU.cupEars= earCupDistance>earCupMin?false:true;
        specificFeedbackSU.flattenShoulder= shoulderBladeAngle<shoulderBladeMin?false:true;
        specificFeedbackSU.butt= buttAngle<buttStart?false:true;
        specificFeedbackSU.kneePosition= kneeAngle>kneeMin?false:true;
        if (specificFeedbackSU.cupEars && specificFeedbackSU.flattenShoulder && specificFeedbackSU.butt && specificFeedbackSU.kneePosition){
          count += 0.5;
          direction = 0;
        }
      }
    }
  }
  // console.log(earCupDistance,touchKneeDistance,shoulderBladeAngle, buttAngle, kneeAngle);
  // console.log("feedback is %s", feedback);
  // console.log("cupEars is %s, butt is %s, kneePosition is %s, touchKnees is %s and flattenShoulder is %s", specificFeedbackSU.cupEars, specificFeedbackSU.butt, specificFeedbackSU.kneePosition,specificFeedbackSU.touchKnees,specificFeedbackSU.flattenShoulder);
  // console.log("count is %d", count);
  return [count, feedback, specificFeedbackSU];
}