import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackArrow from "../../assets/images/BackArrow.svg";
import EditProfileView from "../EditProfileView/EditProfileView";
import SceneName from "../../constants/SceneName";
import Constants from "expo-constants";
const SettingView = () => {
    const navigation = useNavigation();
  return (
    <View style={{flex: 1, marginTop: Constants.statusBarHeight,}}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{flexDirection: "row", marginTop: 5}}>
            <BackArrow
              height={15}
              width={15}
              fill={"white"}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontWeight: "bold", color: "white" }}>Regresar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <EditProfileView route={{ name: SceneName.EditProfile }} />
      </View>
    </View>
  );
};

export default SettingView;
