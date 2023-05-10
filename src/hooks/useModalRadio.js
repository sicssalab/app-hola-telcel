import React, { useEffect } from "react";
import { useGlobalState, useDispatch } from "../context/StoreProvider";
import { Audio } from "expo-av";
import audioStreamingAction from "../actions/audioStreamingAction";
const useModalRadio = (sound) => {
  //TODO proceo de musica
  const { audioStreaming } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    LoadAudio();
  }, []);

  const PlayAudio = async () => {
    try {
      //TODO error bug radio playlist play
      const result = await sound.current.getStatusAsync();
      //setPlayMusic(true);
      
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.error(error, "func play audio");
    }
  };
  const PauseAudio = async () => {
    try {
      //setPlayMusic(false);
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.error(error, "func pasuse audio");
    }
  };

  const LoadAudio = async () => {
    const responseAudio = {
      loading: false,
      loaded: false,
    };
    responseAudio.loading = true;
    //SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        //console.log('entrar a cargar el audio');
        const result = await sound.current.loadAsync(
          require("../assets/music/Here-it-Comes-TrackTribe2.mp3"),
          {},
          true
        );

        if (result.isLoaded === false) {
          //SetLoading(false);
          responseAudio.loading = false;
          //console.error("Error in Loading Audio");
        } else {
          // console.log(
          //   'cargo el video quita el loagind y dice que Loaded cargado video es true',
          // );
          responseAudio.loading = false;
          responseAudio.loaded = true;
          //SetLoading(false);
          //SetLoaded(true);
        }
      } catch (error) {
        //console.error(error, " func load audio");
        //SetLoading(false);
        responseAudio.loading = false;
      }
    } else {
      // console.log('tiene audio activo por lo que no cargara uno nuevo');
      // console.log('crear nuevo audio');
      //SetLoading(false);
      responseAudio.loading = false;
    }

    audioStreamingAction.update(responseAudio, dispatch);
  };
  React.useEffect(() => {
    LoadAudio();
  }, []);

  useEffect(() => {
    const inAudioStreaming = { ...audioStreaming };
    if(audioStreaming.playAudio) {
        PlayAudio();
        inAudioStreaming.playMusic = true;
        inAudioStreaming.playAudio = false;
        audioStreamingAction.update(inAudioStreaming, dispatch);
    }
    if(audioStreaming.pauseAudio) {
        PauseAudio();
        inAudioStreaming.playMusic = false;
        inAudioStreaming.pauseAudio = false;
        audioStreamingAction.update(inAudioStreaming, dispatch);
    }
  }, [audioStreaming]);
};

export default useModalRadio;
