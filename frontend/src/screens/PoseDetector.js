import * as Permissions from "expo-permissions";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useEffect, useState } from 'react';
import Canvas from 'react-native-canvas';
import * as posenet from '@tensorflow-models/posenet';
import { Button, View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, SafeAreaView } from "react-native"
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import { drawSkeletonPushUps, drawSkeletonSitUps, drawKeypoints } from "../utilities/draw";
import * as styles from '../css/PoseDetector.module.css';
import * as globalStyles from '../css/globals.css';
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function PoseDector(navigation) {
  let activity = navigation.route.name;
  const isLoaded = useTensorFlowLoaded(); // see 1A
  const [status] = Permissions.usePermissions(Permissions.CAMERA, {
    ask: true,
  });
  if (!(status || {}).granted) {
    return <LoadingView>Camera permission is required to continue</LoadingView>;
  }
  if (!isLoaded) {
    return <LoadingView>Loading TensorFlow</LoadingView>;
  }
  return <ModelView type={activity} />;
}

function ModelView({ type }) {
  const model = useTensorFlowModel(posenet); // see 1B
  const [predictions, setPredictions] = React.useState({});
  const [result, setResult] = React.useState({});
  const [timer, setTimer] = React.useState('00');
  const [start, setStart] = React.useState(false);
  const size = useWindowDimensions();
  const canvasRef = useRef(null);


  useEffect(() => {
    setTimeout(() => {
      if (canvasRef.current && JSON.stringify(predictions) != "{}") {
        canvasRef.current.width = size.width
        canvasRef.current.height = size.height
        const ctx = canvasRef.current.getContext('2d');
        drawKeypoints(predictions["keypoints"], 0.5, ctx, 1, 1) //5.5, 4)
        start ? setResult(type == "PushUps" ? drawSkeletonPushUps(predictions["keypoints"], 0.5, ctx, 1, 1) : drawSkeletonSitUps(predictions["keypoints"], 0.1, ctx, 1, 1)) : null;//5.5, 4)
        // console.log(result);
      }
    }, 0)
  }, [canvasRef, predictions]);

  if (!model) {
    return <LoadingView message="Loading TensorFlow model" />; // see 0
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <TimerDisplay timer={timer} />
      <StartButton setTimer={setTimer} timer={timer} setStart={setStart} />
      {result[0] ? <SubmitButton start={start} score={Math.floor(result[0])} activity={type} /> : null}
      {result[0] ? <ScoreDisplay score={Math.floor(result[0])} /> : null}
      {result[1] ? <DirectionDisplay direction={result[1]} /> : null}
      <Canvas ref={canvasRef} style={{ position: 'absolute', left: 0, top: -35, width: '100%', height: '100%', zIndex: 1000, backgroundColor: 'none' }} />
      <ModelCamera model={model} setPredictions={setPredictions} style={{ position: 'absolute', zIndex: 1 }} />
      {/* see 3 */}
      {/* <PredictionList predictions={predictions} /> */}
      {result ? <FeedbackDisplay feedback={result[2]} /> : null}
      {/* see 2 */}
    </SafeAreaView>
  );
}

// 0
function LoadingView({ children }) {
  return (
    <View style={styles.loadingContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.loadingText}>{children}</Text>
        <ActivityIndicator />
      </View>
    </View>
  );
}

// 1A
function useTensorFlowLoaded() {
  const [isLoaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    let isMounted = true;
    tf.ready().then(() => {
      if (isMounted) {
        setLoaded(true);
      }
    });
    return () => (isMounted = false);
  }, []);

  return isLoaded;
}

// 1B
function useTensorFlowModel(modelKind) {
  const [model, setModel] = React.useState(null);
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  React.useEffect(() => {
    setModel(null);
    modelKind.load().then((model) => {
      if (isMounted.current) {
        setModel(model);
      }
    });
  }, [modelKind]);

  return model;
}

// 2
// function PredictionList({ predictions = {} }) {
// return (
//     <View style={styles.predictionContainer}>
//         <Text style={styles.predictionText} key={`item-0`}>
//           {predictions.score}
//         </Text>
//     </View>
// );
// }

function TimerDisplay({ timer }) {
  return (
    <View style={styles.timerContainer}>
      {parseInt(timer) != 0 ? <Text style={styles.timerText}>Timer:</Text> : null}
      {parseInt(timer) != 0 ? <Text style={styles.timerText}>{timer}</Text> : null}
    </View>
  )
}

function StartButton({ setTimer, timer, setStart }) {
  const timeLimit = 60;
  const Ref = useRef(null);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }
  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }
  const clearTimer = (e) => {
    setTimer(timeLimit);
    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  }
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeLimit);
    return deadline;
  }
  parseInt(timer) <= 0 ? setStart(false) : setStart(true);
  return (
    <View style={styles.startContainer}>
      {parseInt(timer) <= 0 ? <Button
        onPress={() => {
          clearTimer(getDeadTime())
        }}
        title="Start" /> : null}
    </View>
  )
}

function SubmitButton({ start, score, type }) {
  const [data, setData] = useState({});
  const [patchRes, setPatchRes] = useState('');
  const [currentAbilities, setCurrentAbilities] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch('http://52.77.246.182:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: "Jimmy",
          password: "password"
        })
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (type == 'Pushups') {
        setCurrentAbilities({
          "pushUpCount": score,
          "sitUpCount": data.currentAbilities.sitUpCount,
          "runTimeInSeconds": data.currentAbilities.runTimeInSeconds
        })
      } else {
        setCurrentAbilities({
          "pushUpCount": data.currentAbilities.pushUpCount,
          "sitUpCount": score,
          "runTimeInSeconds": data.currentAbilities.runTimeInSeconds
        })
      }
    }
  }, [data])

  useEffect(() => {
    getUser();
  }, [])

  const patchUser = async () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "Jimmy",
        password: "password",
        currentAbilities: currentAbilities
      })
    };
    fetch("http://52.77.246.182:3000/users", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        // Do something with the response
        setPatchRes(responseJson);
        console.log(patchRes);
      })
      .catch((error) => {
        console.log(error)
      });
    // .then(response => response.json())
    // .then(data => setPatchRes(data))
    // .then(console.log(patchRes))
    // try {
    //   const response = await fetch('http://52.77.246.182:3000/users', requestOptions);
    //   const json = await response.json();
    //   console.log("Patching user...");
    //   setPatchRes(json);
    //   console.log(patchRes);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  if (!start && score > 0) {
    return (
      <View style={styles.submitContainer}>
        <Button
          onPress={() => {
            patchUser();
            console.log("submitted %d", score);
          }}
          title="Submit Scores" />
      </View>
    )
  }
}
function ScoreDisplay({ score }) {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText} >
        {score}
      </Text>
    </View>
  );
}
function DirectionDisplay({ direction }) {
  // console.log(direction)
  return (
    <View style={styles.directionContainer}>
      <Text style={styles.directionText}>State:</Text>
      <Text style={styles.directionText}>
        {/* {{direction}=="Begin"?"Get Ready":{"Direction:"+ direction}} - why cant this work*/}
        {direction}
      </Text>
    </View>
  );
}

function FeedbackDisplay(props) {
  let itemList = [];
  if (Object.entries(props)[0][1]) {
    for (const [key, value] of Object.entries(Object.entries(props)[0][1])) {
      if (value == false) {
        // itemList.push(<Text style={styles.feedbackText} key={`item-0`}>{key}</Text>)
        itemList.push(key + " ")
      }
    }
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>{itemList.length > 0 ? "Incorrect Posture" : "Correct Posture"}:</Text>
        <Text style={styles.feedbackText}>{itemList}</Text>
      </View>
    );
  }
  // console.log(Object.entries(props)[0][1].map( ([key, value]) => `My key is ${key} and my value is ${value}`);
}

// 3
function ModelCamera({ model, setPredictions }) {
  const raf = React.useRef(null);
  const size = useWindowDimensions();

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const onReady = React.useCallback(
    (images) => {
      const loop = async () => {
        const nextImageTensor = images.next().value;
        // const predictions = await model.posenet.predictions(nextImageTensor)
        const predictions = await model.estimateSinglePose(nextImageTensor, { flipHorizontal: false, outputStride: 32 });
        // const predictions = await model.classify(nextImageTensor);
        // console.log(predictions)
        setPredictions(predictions);
        raf.current = requestAnimationFrame(loop);
      };
      loop();
    },
    [setPredictions]
  );

  return React.useMemo(
    () => (
      <CustomTensorCamera
        width={size.width}
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onReady={onReady}
        autorender
      />
    ),
    [onReady, size.width]
  );
}

// 3.1
function CustomTensorCamera({ style, width, ...props }) {
  const size = useWindowDimensions()
  const TEXTURE_SIZE = { width: 1080, height: 1920 };
  const CAMERA_RATIO = TEXTURE_SIZE.height / TEXTURE_SIZE.width;
  const TENSOR_SIZE = {
    width: size.width,
    height: size.height,
  };
  const TensorCamera = cameraWithTensors(Camera); // cameraWithTensors and Camera is imported
  const sizeStyle = React.useMemo(() => {
    const ratio = width / TEXTURE_SIZE.width;
    const cameraWidth = TEXTURE_SIZE.width * ratio;
    const cameraHeight = TEXTURE_SIZE.height * ratio;
    return {
      maxWidth: cameraWidth,
      minWidth: cameraWidth,
      maxHeight: cameraHeight,
      minHeight: cameraHeight,
    };
  }, [width]);
  return (
    <TensorCamera
      {...props}
      style={[style, sizeStyle]}
      cameraTextureWidth={TEXTURE_SIZE.width}
      cameraTextureHeight={TEXTURE_SIZE.height}
      resizeWidth={TENSOR_SIZE.width}
      resizeHeight={TENSOR_SIZE.height}
      resizeDepth={3}
    />
  );
}

// const styles = StyleSheet.create({
//   camera: {
//     zIndex: 0,
//   },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   loadingText: { fontSize: 18, textAlign: "center", marginRight: 8 },
//   predictionContainer: {
//     zIndex: 100,
//     position: "absolute",
//     bottom: 24,
//     left: 24,
//     right: 24,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   predictionText: {
//     paddingVertical: 2,
//     fontSize: 20,
//   },
//   scoreContainer: {
//     zIndex: 100,
//     position: "absolute",
//     top: 24,
//     right: 24,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 20,
//     borderRadius: 50,
//     alignItems: "center",
//   },
//   scoreText: {
//     paddingVertical: 2,
//     fontSize: 40,
//   },
//   feedbackContainer: {
//     zIndex: 100,
//     position: "absolute",
//     bottom: 24,
//     right: 10,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   feedbackText: {
//     paddingVertical: 2,
//     fontSize: 20,
//   },
//   directionContainer: {
//     zIndex: 100,
//     position: "absolute",
//     top: 24,
//     right: 100,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   directionText: {
//     paddingVertical: 2,
//     fontSize: 20,
//   },
//   timerContainer: {
//     zIndex: 100,
//     position: "absolute",
//     bottom: 24,
//     left: 10,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 8,
//     borderRadius: 50,
//     alignItems: "center",
//   },
//   timerText: {
//     padding: 4,
//     fontSize: 30,
//   },
//   startContainer: {
//     zIndex: 1100,
//     position: "absolute",
//     justifyContent: "center",
//     left: 20,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   startText: {
//     paddingVertical: 2,
//     fontSize: 30,
//   },
//   submitContainer: {
//     zIndex: 1100,
//     position: "absolute",
//     justifyContent: "center",
//     right: 20,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     padding: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   submitText: {
//     paddingVertical: 2,
//     fontSize: 30,
//   },
// });
