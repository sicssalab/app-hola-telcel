import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import { Video, ResizeMode } from "expo-av";
import VideoTimeLine from "./VideoTimeLine";
const { height, width } = Dimensions.get("window");

const PlayerFeed = ({ videoParams }) => {
  const videoRef = useRef(null);
  const [isStarted, setIsstarted] = useState(videoParams.isPlay);
  const [holdVideo, setHoldVideo] = useState(videoParams.isPlay);
  const [videoStatus, setVideoStatus] = useState(null);

  const onBuffer = (e) => {
    console.log("bufering..", e);
  };
  const onError = (e) => {
    console.log("error rised", e);
  };

  useEffect(() => {
    setIsstarted(videoParams.isPlay);
    setVideoStatus(null);
    if(videoParams.isPlay)
      setHoldVideo(true);
    // return () => {
    //   console.log("salir de la vista de", videoParams.index);
    //   setIsstarted(false);
    // };
    //console.log(`${videoParams.name} play: ${videoParams.isPlay}`);
  }, [videoParams.isPlay]);

  const pressVideo = () => {
    setIsstarted(!isStarted);
  };

  return (
    <>
      <Pressable onPress={pressVideo} style={{ width: "100%", flex: 1 }}>
        {holdVideo && (
          <Video
            id={videoParams.index}
            ref={videoRef}
            source={{ uri: videoParams.url }}
            resizeMode={ResizeMode.CONTAIN}
            progressUpdateIntervalMillis={10}
            onBuffer={onBuffer}
            onError={onError}
            shouldPlay={isStarted}
            isMuted={false}
            volume={1}
            isBuffering={true}
            onLoadStart={() => {
              //console.log("inicio descarga", videoParams.name)
            }}
            onLoad={() => {
              console.log("descargo la historia", videoParams.name)
            }}
            style={styles.backgroundVideo}
            onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
            isLooping={true}
          />
        )}
      </Pressable>
      {videoStatus && <VideoTimeLine videoStatus={videoStatus} />}
    </>
  );
};

export default PlayerFeed;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    height: height,
    width: width,
  },
});
