import { useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import audioStreamingAction from "../../actions/audioStreamingAction";

const VideoInMedia = (props) => {
  //TODO showPreview identifica si es premium
  const { videoData: video, autoPlay, itemView, showPreview } = props;
  const [status, setStatus] = useState({}); //TODO status del video
  const videoRef = useRef(null);
  const { audioStreaming } = useGlobalState();
  const dispatch = useDispatch();

  const onBuffer = (e) => {
    console.log("bufering..", e);
  };

  const onError = (e) => {
    console.error("error cargar el video", e, itemView.name);
  };

  useEffect(() => {
    if (status?.isPlaying) {
      let audioStop = true;
      if (itemView && itemView.hasPremium) {
        const { onPress } = props;
        //TODO detiene el video por ser premium
        if (!showPreview) {
          videoRef.current.pauseAsync();
          onPress && onPress();
          audioStop = false;
        }
      }

      //TODO parar el audio si esta repoduciendo
      if (audioStop && audioStreaming.playMusic) {
        const inAudioStreaming = { ...audioStreaming };
        inAudioStreaming.playMusicAux = true; //TODO guardo el play
        inAudioStreaming.pauseAudio = true; //TODO detengo el play
        audioStreamingAction.update(inAudioStreaming, dispatch);
      }
    } else {
      //TODO detuvo el video pero revisa si el audio estaba corriengo
      if (audioStreaming.playMusicAux) {
        const inAudioStreaming = { ...audioStreaming };
        inAudioStreaming.playMusicAux = false; //TODO guardo el play
        inAudioStreaming.pauseAudio = false; //TODO detengo el play
        inAudioStreaming.playAudio = true; //TODO detengo el play
        audioStreamingAction.update(inAudioStreaming, dispatch);
      }
    }
  }, [status?.isPlaying]);

  // useEffect(() => {
  //   if (showPreview) {
  //     videoRef.current.playAsync();
  //   }
  // }, [showPreview]);

  return (
    <Video
      source={{ uri: video.uri ? video.uri : video }}
      ref={videoRef}
      useNativeControls={true}
      onPlaybackStatusUpdate={(status) => {
        setStatus(() => status);
      }}
      isMuted={false}
      resizeMode={ResizeMode.COVER}
      onBuffer={onBuffer}
      onError={onError}
      //onLoadStart={() => console.log(`inicia la carga del video ${itemView.name} y su play es: ${autoPlay}`)}
      onLoad={() => console.log(`descargo el video ${itemView.name}`)}
      shouldPlay={autoPlay}
      style={{ flex: 1 }}
    />
  );
};
VideoInMedia.defaultProps = {
  autoPlay: false,
  playVideo: true,
};
export default VideoInMedia;
