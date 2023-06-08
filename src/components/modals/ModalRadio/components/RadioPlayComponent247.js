import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PauseIcon from "../../../../assets/icons/pause.svg";
import PlayIcon from "../../../../assets/icons/play_arrow.svg";
import utils from "../../../../utils";

const RadioPlayComponent247 = (props) => {
  const { item } = props;
  const [play, setPlay] = useState(false);

  const [indexRandom, setIndexRandom] = useState(utils.getRandomInt(item.data.length))//index 0,1,2,n

  const [audioRandom, setAudioRandom] = useState(item.data[indexRandom]);


  const PlayAudio = () => {
    const { onPlayAudio } = props;
    const audio = {
      id: audioRandom.id,
      audio: audioRandom.audio
    }
    console.log("audio debio ser true")
    onPlayAudio && onPlayAudio(audio);
    setPlay(true);
  };
  const PauseAudio = () => {
    const { onPauseAudio } = props;
    setPlay(false);
    console.log("audio debio ser fale:")
    onPauseAudio && onPauseAudio();
  };

  useEffect(() => {
    console.log("eel audio es", play)
  },[play])

  useEffect(() => {
    console.log("entra por primera vez audio")
  },[])
  const ButtonRadio = (props) => {
    return (
      <View style={styles.buttonRadioContainer}>
        <View style={styles.buttonRadioOpacity}>
          <View style={styles.buttonRadio}>{props.children}</View>
        </View>
      </View>
    );
  };

  console.log(play, "play")
  /*TODO 
  - Radio tiene un listado de audios donde cargara como random 1
  - Manda el audio a reproducir para que el estado global lo reconozca y lo integre
  */


  return (
    <View style={styles.contaner}>
      <Text style={{ color: 'white' }}>{audioRandom.audio}</Text>
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <ButtonRadio>
            {play && (
              <TouchableOpacity onPress={PauseAudio}>
                <PauseIcon width={60} height={60} fill={"gold"} />
              </TouchableOpacity>
            )}
            {!play && (
              <TouchableOpacity onPress={PlayAudio}>
                <PlayIcon width={60} height={60} fill={"gold"} />
              </TouchableOpacity>
            )}
          </ButtonRadio>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contaner: {
    //backgroundColor: '#111001',
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 50,
    padding: 15,
    borderRadius: 15,
  },
  buttonRadioContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "#ffd70036",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRadioOpacity: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: "#ffd7007a",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRadio: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "gold",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RadioPlayComponent247;
