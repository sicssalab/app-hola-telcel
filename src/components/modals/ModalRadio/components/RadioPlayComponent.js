import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import { ThemeContext } from 'styled-components/native';
import PauseIcon from '../../../../assets/icons/pause.svg';
import PlayIcon from '../../../../assets/icons/play_arrow.svg';

const RadioPlayComponent = (props) => {
  const { stacion, musicON, Loading, Loaded, playMusic } = props;
  const themeContext = useContext(ThemeContext);

  const PlayAudio = () => {
    const {onPlayAudio} = props;
    onPlayAudio && onPlayAudio();
  }
  const PauseAudio = () => {
    const {onPauseAudio} = props;
    onPauseAudio && onPauseAudio();
  }

  const ButtonRadio = (props) => {
    return <View style={styles.buttonRadioContainer}>
        <View  style={styles.buttonRadioOpacity}>
          <View style={styles.buttonRadio}>
            {props.children}
          </View>
        </View>
    </View>
  }

  return (
    <View style={styles.contaner}>
      <Text style={{ color: 'white' }}>{stacion?.name}</Text>
      <Text style={{ color: 'white' }}>{musicON?.name}</Text>
      <View>
        <View>
          {Loading ? (
            <ActivityIndicator size={'small'} color={'red'} />
          ) : (
            <>
              {Loaded === false ? (
                <>
                  <ActivityIndicator />
                  <Text>Loading Song </Text>
                </>
              ) : (
                <View style={{alignItems: "center", marginTop: 10}}>
                  {/* <Button title='Play Song' onPress={PlayAudio} />
                  <Button title='Pause Song' onPress={PauseAudio} /> */}
                  <ButtonRadio>
                    {playMusic && (
                      <TouchableOpacity onPress={PauseAudio}>
                        <PauseIcon
                          width={60}
                          height={60}
                          fill={"gold"}
                        />
                      </TouchableOpacity>
                    )}
                    {!playMusic && (
                      <TouchableOpacity onPress={PlayAudio}>
                        <PlayIcon
                          width={60}
                          height={60}
                          fill={"gold"}
                        />
                      </TouchableOpacity>
                    )}

                  </ButtonRadio>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: '#111001',
    flexDirection: 'column',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 50,
    padding: 15,
    borderRadius: 15,
  },
  contentHeader: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  modalContainerBody: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: 'red',
    flex: 1,
    //width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    color: '#fff',
    fill: '#fff',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  buttonRadioContainer: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderColor: "#ffd70036",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRadioOpacity: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#ffd7007a",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRadio: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "gold",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default RadioPlayComponent;
