import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ThemeContext } from "styled-components/native";
import ListGlobalPost from "../../components/ui/ListGlobalPost/ListGlobalPost";
import HeaderGroupSectionScreen from "./components/HeaderGroupSectionScreen";
import { typeMockConstants } from "../../constants/typeMockConstants";
// import groupsUrbans from "../../mocks/groups-urban.json";
// import { mockAvenidasPerfiles } from "../../mocks/mockAvenidasPerfiles";
// import mocksExperienciasPerfiles from "../../mocks/experiencias/mocksExperienciasPerfiles.json";
// import mockPueblosMagicosPerfiles from "../../mocks/pueblos-magicos/mocksPueblosMagicosPerfiles.json"
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import entertainmentProfileListAction from "../../actions/entertainmentProfileListAction";
import { SafeComponent } from "../../components";
import avenueProfileListAction from "../../actions/avenueProfileListAction";
import experienceProfileListAction from "../../actions/experienceProfileListAction";
import magicTownProfileListAction from "../../actions/magicTownProfileListAction";

const GroupUrbanView = (props) => {
  const { colors } = useContext(ThemeContext);
  const [itemView, setItemView] = useState([]);
  const { entertainmentProfileList, avenueProfileList, experienceProfileList, magicTownProfileList } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    (!entertainmentProfileList.complete && entertainmentProfileList.data?.length <= 0) && entertainmentProfileListAction.get({}, dispatch);
    (!avenueProfileList.complete && avenueProfileList.data?.length <= 0) && avenueProfileListAction.get({}, dispatch);
    (!experienceProfileList.complete && experienceProfileList.data?.length <= 0) && experienceProfileListAction.get({}, dispatch);
    (!magicTownProfileList.complete && magicTownProfileList.data?.length <= 0) && magicTownProfileListAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    switch (props.route.params.profilePage.type) {
      case typeMockConstants.GROUP_PROFILE:
        //TODO mock de entrenetimiendo de grupo/perfil
        setItemView(
          entertainmentProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id
          )
        );
        break;
      case typeMockConstants.AVENUES_PROFILE:
        setItemView(
          avenueProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id
          )
        );
        break;
      case typeMockConstants.SERVICES_PROFILE:
        setItemView(
          experienceProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id
          )
        );
        break;
      case typeMockConstants.MAGIC_TOWNS_PROFILE:
        setItemView(
          magicTownProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id
          )
        );
        break;
      default:
    }
  }, [props.route.params.id, entertainmentProfileList, avenueProfileList, experienceProfileList, magicTownProfileList]);

  const returnDataSafe = () => {
    switch(props.route.params.profilePage.type) {
      case typeMockConstants.GROUP_PROFILE:
        return entertainmentProfileList;
      case typeMockConstants.AVENUES_PROFILE:
        return avenueProfileList;
      case typeMockConstants.SERVICES_PROFILE:
          return experienceProfileList;
      case typeMockConstants.MAGIC_TOWNS_PROFILE:
        return magicTownProfileList;
      default:
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondaryBackground }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderGroupSectionScreen
          item={
            itemView
              ? itemView
              : {
                  name: "regresar",
                }
          }
        />
        <SafeComponent request={returnDataSafe()}>
          {!itemView && (
            <View>
              <Text style={styles.userInfoSubTitle}>
                Ups! no se encontro el perfil seleccionado
              </Text>
            </View>
          )}
          {itemView && (
            <ScrollView
              style={styles.container}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.secondaryBackground,
              }}
              showsVerticalScrollIndicator={false}
              horizontal={false}
            >
              <Image
                cove
                style={styles.profileCover}
                source={{ uri: itemView.profileCover }}
              />
              <Text style={styles.userName}>{itemView.name}</Text>
              <Text style={styles.aboutUser}>
                {itemView.hasPremium ? "Privado" : "Publico"}
                {itemView.members ? ` - ${itemView.members} miembros` : ""}
              </Text>
              {/* <Text style={styles.aboutUser}>{itemView?.description}</Text> */}
              <View style={styles.userBtnWrapper}>
                <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                  <Text style={styles.userBtnTxt}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                  <Text style={styles.userBtnTxt}>Follow</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.userInfoWrapper}>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>
                    {itemView.content?.length}
                  </Text>
                  <Text style={styles.userInfoSubTitle}>Publicaciones</Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>{itemView.members}</Text>
                  <Text style={styles.userInfoSubTitle}>Seguidos</Text>
                </View>
              </View>
              <ListGlobalPost items={itemView.content} />
            </ScrollView>
          )}
        </SafeComponent>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    paddingTop: 10,
  },
  profileCover: {
    height: 250,
    width: "100%",
    borderRadius: 0,
    paddingTop: 10,
    resizeMode: "contain",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "white",
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#FFF",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 0,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#666",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
export default GroupUrbanView;
