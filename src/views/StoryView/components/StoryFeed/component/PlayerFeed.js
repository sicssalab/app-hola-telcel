import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import { Audio, Video, ResizeMode } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import VideoTimeLine from "./VideoTimeLine";
const { height, width } = Dimensions.get("window");

const PlayerFeed = ({ videoParams }) => {
  const videoRef = useRef(null);
  const [isStarted, setIsstarted] = useState(false);
  const [videoStatus, setVideoStatus] = useState(null);

  const onBuffer = (e) => {
    console.log("bufering..", e);
  };
  const onError = (e) => {
    console.log("error rised", e);
  };
  //   useFocusEffect(
  //     useCallback(() => {
  //       setIsstarted(videoParams.isPlay);
  //       console.info(videoParams.isPlay, videoParams.index)
  //       return () => {
  //         setIsstarted(false);
  //       };
  //     }, [videoParams.isPlay])
  //   );

  useEffect(() => {
    setIsstarted(videoParams.isPlay);
    setVideoStatus(null);
    //console.info(videoParams.isPlay, videoParams.index);
    // return () => {
    //   console.log("salir de la vista de", videoParams.index);
    //   setIsstarted(false);
    // };
  }, [videoParams.isPlay]);

  const pressVideo = () => {
    setIsstarted(!isStarted);
  };

  return (
    <>
      <Pressable onPress={pressVideo} style={{ width: "100%", flex: 1 }}>
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
          onLoad={() => {
            if (videoParams.isPlay) {
              console.log(
                "cargo el video",
                videoParams.name,
                videoParams.index,
                isStarted
              );
              console.log(videoStatus);
              if (!videoStatus.isLoaded) {
                //TODO, reproducir
                console.log("reproducir");
                videoRef.current.playAsync();
              }
            }
          }}
          onLoadStart={() => {
            if (!videoParams.isPlay) {
              if (videoStatus == null || videoStatus.isLoaded) {
                //TODO, reproducir
                console.log("detener ",videoParams.name);
                videoRef.current.pauseAsync();
              }
            }
          }}
          style={styles.backgroundVideo}
          onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
          isLooping={true}
        />
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
