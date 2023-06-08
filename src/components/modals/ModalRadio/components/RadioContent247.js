import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
  Image,
} from "react-native";
import RadioPlayComponent247 from "./RadioPlayComponent247";

const RadioContent247 = (props) => {
  const { item } = props;

  const PlayAudio = (response) => {
    const { onPlayAudio } = props;
    onPlayAudio && onPlayAudio(response);
  };
  const PauseAudio = () => {
    const { onPauseAudio } = props;
    onPauseAudio && onPauseAudio();
  };

  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: '#ff4081',
        alignItems: "center",
        marginTop: 20
      }}
    >
      {item && (
        <>
          <Text numberOfLines={2} style={{ color: "white", textAlign: "center", marginVertical: 20, fontSize: 20, fontWeight: "bold" }}>
            {item.name}
          </Text>
          <Image
            source={{ uri: item.profile }}
            style={{
              width: "90%",
              height: 250,
              resizeMode: "cover",
              borderRadius: 10,
              backgroundColor: "#f3f3f4",
            }}
          />
          <RadioPlayComponent247 
            item={item}
            //musicON={musicON}
            onPlayAudio={PlayAudio}
            onPauseAudio={PauseAudio}
            //playMusic={false}
          />
        </>
      )}
    </View>
  );
};

export default RadioContent247;
