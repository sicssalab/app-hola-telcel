import { useRef } from "react";
import { Video, ResizeMode } from "expo-av";

const VideoInMedia = (props) => {
  const { videoData: video, autoPlay } = props;

  const videoRef = useRef(null);

  const onBuffer = (e) => {
    console.log("bufering..", e);
  };

  const onError = (e) => {
    console.log("error rised", e);
  };

  return (
    <Video
      //   source={{ uri: resource.uri }}
      //   onPlaybackStatusUpdate={(status) =>
      //     handlePlaybackStatusUpdate(index, status)
      //   }
      source={{ uri: video.uri ? video.uri : video }}
      ref={videoRef}
      useNativeControls={video.url ? false : true}
      resizeMode={ResizeMode.COVER}
      onBuffer={onBuffer}
      onError={onError}
      shouldPlay={autoPlay}
      style={{ flex: 1 }}
      //   style={{
      //     height: video.height ? video.height : 350,
      //     width: video.width ? video.width : "100%",
      //   }}
    />
  );
};
VideoInMedia.defaultProps = {
  autoPlay: false,
};
export default VideoInMedia;
