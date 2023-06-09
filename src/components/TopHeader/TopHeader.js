import React, { useCallback, useContext, useState } from "react";
import { ThemeContext } from "styled-components/native";
import { Image } from "react-native";
import { Audio } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchIcon from "../../assets/icons/general/search.svg";
import RadioIcon from "../../assets/icons/stream/podcasts.svg";
import ModalRadio from "../../components/modals/ModalRadio";

import {
  Container,
  SearchIconWrapper,
  LogoWrapper,
  LeftSide,
  RightSide,
} from "./styles";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import audioStreamingAction from "../../actions/audioStreamingAction";

const TOP_HEIGHT = 60;

export const useTopHeaderStyle = () => {
  const { top } = useSafeAreaInsets();

  return {
    paddingTop: top,
    height: top + TOP_HEIGHT,
  };
};

function TopHeader() {
  const themeContext = useContext(ThemeContext);
  const style = useTopHeaderStyle();
  const { audioStreaming } = useGlobalState();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  const PlayAudio = () => {
    const inAudioStreaming = { ...audioStreaming };
    inAudioStreaming.playAudio = true;
    inAudioStreaming.pauseAudio = false;

    audioStreamingAction.update(inAudioStreaming, dispatch);
  };
  const PauseAudio = () => {
    const inAudioStreaming = { ...audioStreaming };
    inAudioStreaming.playAudio = false;
    inAudioStreaming.pauseAudio = true;

    audioStreamingAction.update(inAudioStreaming, dispatch);
  };

  return (
    <Container style={[style]}>
      <LeftSide>
        <LogoWrapper>
          <Image
            source={require("../../assets/images/HolaTelcel.png")}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: "contain",
            }}
          />
        </LogoWrapper>
      </LeftSide>
      <RightSide>
        <SearchIconWrapper>
          <SearchIcon fill={themeContext.colors.text} />
        </SearchIconWrapper>
        <TouchableOpacity activeOpacity={1} onPress={onShowModal}>
          <RadioIcon fill={(audioStreaming.playMusic || audioStreaming.playMusicAux) ? "gold": themeContext.colors.text} />
        </TouchableOpacity>
      </RightSide>
      <ModalRadio
        modalVisible={showModal}
        onClose={onShowModal}
        Loading={audioStreaming.loading}
        Loaded={audioStreaming.loaded}
        playMusic={audioStreaming.playMusic}
        onPlayAudio={PlayAudio}
        onPauseAudio={PauseAudio}
      />
    </Container>
  );
}

export default TopHeader;
