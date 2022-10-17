import * as tf from "@tensorflow/tfjs";
import React, {useRef, useEffect} from 'react';
import Canvas from 'react-native-canvas';
import * as posenet from '@tensorflow-models/posenet';
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, SafeAreaView } from "react-native"
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import { drawSkeletonPushUps, drawSkeletonSitUps } from "../utilities/draw";

export default function PoseDector() {
    const isLoaded = useTensorFlowLoaded(); // see 1A
    const [status, reqStatus] = Camera.useCameraPermissions();
    if (!(status || {}).granted) {
      return <LoadingView>Camera permission is required to continue</LoadingView>;
    }
    if (!isLoaded) {
      return <LoadingView>Loading TensorFlow</LoadingView>;
    }
    return <ModelView />;
}

function ModelView(){
    const model = useTensorFlowModel(posenet); // see 1B
    const [predictions, setPredictions] = React.useState({});
    const canvasRef = useRef(null);
    useEffect(() => {
      setTimeout(() => {
        if (canvasRef.current && JSON.stringify(predictions)!="{}") {
          console.log("test")
          const ctx = canvasRef.current.getContext('2d');
          drawSkeletonPushUps(predictions["keypoints"], 0.5, ctx)
          ctx.beginPath();
          ctx.arc(100, 100, 40, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fillStyle = 'blue';
          ctx.fill();
        }
      }, 1000)
    }, [canvasRef]);

    if (!model) {
        return <LoadingView message="Loading TensorFlow model" />; // see 0
    }

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center"  }}>
            <Canvas ref={canvasRef} style={{ position:'absolute', width: '100%', height: '100%', zIndex: '1000', textAlign: "center", backgroundColor: 'none' }}/>
          <ModelCamera model={model} setPredictions={setPredictions} style ={{position:'absolute', zIndex: '1' }}/>
          {/* see 3 */}
          <PredictionList predictions={predictions} />
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
function PredictionList({ predictions = {} }) {
return (
    <View style={styles.predictionContainer}>
        <Text style={styles.predictionText} key={`item-0`}>
          {predictions.score}
        </Text>

    </View>
);
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
          const predictions = await model.estimateSinglePose(nextImageTensor, {flipHorizontal: false});
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
    const TEXTURE_SIZE = { width: 1080, height: 1920 };
    const TENSOR_WIDTH = 152;
    const CAMERA_RATIO = TEXTURE_SIZE.height / TEXTURE_SIZE.width;
    const TENSOR_SIZE = {
        width: TENSOR_WIDTH,
        height: TENSOR_WIDTH * CAMERA_RATIO,
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

  const styles = StyleSheet.create({
    camera: {
      zIndex: 0,
    },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    loadingText: { fontSize: 18, textAlign: "center", marginRight: 8 },
    predictionContainer: {
        zIndex: 100,
        position: "absolute",
        bottom: 24,
        left: 24,
        right: 24,
        backgroundColor: "rgba(255,255,255,0.8)",
        padding: 8,
        borderRadius: 20,
        alignItems: "center",
      },
    predictionText: {
        paddingVertical: 2,
        fontSize: 20,
    },
  });