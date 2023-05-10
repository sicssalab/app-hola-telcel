import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import ModalRadio from "../../../components/modals/ModalRadio";
import { useDispatch, useGlobalState } from '../../../context/StoreProvider';
import audioStreamingAction from '../../../actions/audioStreamingAction';
import { SvgUri } from 'react-native-svg';
import settings from '../../../settings';

const HeaderGroupSectionScreen = (props) => {
  const { item } = props;
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { audioStreaming } = useGlobalState();
  const dispatch = useDispatch();

  const themeContext = useContext(ThemeContext);
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
    <View>
      <View style={{width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.goBack}>
          <SvgUri
            width={15}
            height={15} fill={colors.text}
            uri={`${settings.domainImage}images/BackArrow.${settings.typeImage}`}
          />
            {/* <BackArrow
              height={15}
              width={15}
              fill={colors.text}
              style={{ marginRight: 10 }}
            /> */}
            <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white' }}>
              {item.name || 'Undefined'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={onShowModal}>
          {/* <RadioIcon fill={(audioStreaming.playMusic || audioStreaming.playMusicAux) ? "gold": themeContext.colors.text} /> */}
          <SvgUri
            width={30}
            height={30} fill={(audioStreaming.playMusic || audioStreaming.playMusicAux) ? "gold": themeContext.colors.text}
            uri={`${settings.domainImage}icons/stream/podcasts.${settings.typeImage}`}
          />
        </TouchableOpacity>
      </View>
      <ModalRadio
        modalVisible={showModal}
        onClose={onShowModal}
        Loading={audioStreaming.loading}
        Loaded={audioStreaming.loaded}
        playMusic={audioStreaming.playMusic}
        onPlayAudio={PlayAudio}
        onPauseAudio={PauseAudio}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBack: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
});
export default HeaderGroupSectionScreen;
