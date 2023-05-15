import React, { useState, useEffect, useContext, useRef } from "react";
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
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import entertainmentProfileListAction from "../../actions/entertainmentProfileListAction";
import { SafeComponent } from "../../components";
import avenueProfileListAction from "../../actions/avenueProfileListAction";
import experienceProfileListAction from "../../actions/experienceProfileListAction";
import magicTownProfileListAction from "../../actions/magicTownProfileListAction";
import mallProfileListAction from "../../actions/mallProfileListAction";
import GlobalPost from "../../components/posts/GlobalPost/GlobalPost";

const GroupUrbanView = (props) => {
  const { colors } = useContext(ThemeContext);
  const [itemView, setItemView] = useState([]);
  const [visibles, setvisible] = useState([]);
  const [cacheViewItemList, setCacheViewItemList] = useState(0);

  const {
    entertainmentProfileList,
    avenueProfileList,
    experienceProfileList,
    magicTownProfileList,
    mallProfileList,
  } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    !entertainmentProfileList.complete &&
      entertainmentProfileList.data?.length <= 0 &&
      entertainmentProfileListAction.get({}, dispatch);
    !avenueProfileList.complete &&
      avenueProfileList.data?.length <= 0 &&
      avenueProfileListAction.get({}, dispatch);
    !experienceProfileList.complete &&
      experienceProfileList.data?.length <= 0 &&
      experienceProfileListAction.get({}, dispatch);
    !magicTownProfileList.complete &&
      magicTownProfileList.data?.length <= 0 &&
      magicTownProfileListAction.get({}, dispatch);
    !mallProfileList.complete &&
      mallProfileList.data?.length <= 0 &&
      mallProfileListAction.get({}, dispatch);
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
      case typeMockConstants.MALL_PROFILE:
        setItemView(
          mallProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id
          )
        );
        break;
      default:
    }
  }, [
    props.route.params.id,
    entertainmentProfileList,
    avenueProfileList,
    experienceProfileList,
    magicTownProfileList,
    mallProfileList,
  ]);

  const returnDataSafe = () => {
    switch (props.route.params.profilePage.type) {
      case typeMockConstants.GROUP_PROFILE:
        return entertainmentProfileList;
      case typeMockConstants.AVENUES_PROFILE:
        return avenueProfileList;
      case typeMockConstants.SERVICES_PROFILE:
        return experienceProfileList;
      case typeMockConstants.MAGIC_TOWNS_PROFILE:
        return magicTownProfileList;
      case typeMockConstants.MALL_PROFILE:
        return mallProfileList;
      default:
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setvisible(
      viewableItems.map((item) => {
        return {
          index: item.index,
        };
      })
    );
    // const newItemsView = viewableItems.map((item) => {
    //   return {
    //     index: item.index,
    //   };
    // });
    // //setCacheViewItemList(cacheViewItemList + 1)

    // const auxVisibles = visibles.slice();
    // console.log("items visibles");
    // console.log(auxVisibles);
    // console.log("items nuevos visibles");
    // console.log(newItemsView);
    // const arrays = auxVisibles.concat(newItemsView);
    // console.log("Nueva lista");
    // console.log(arrays);
    // setvisible(arrays);
  });

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
            <FlatList
              style={styles.container}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <>
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
                      <Text style={styles.userInfoTitle}>
                        {itemView.members}
                      </Text>
                      <Text style={styles.userInfoSubTitle}>Seguidos</Text>
                    </View>
                  </View>
                  {itemView.banner && (
                    <Image
                      cove
                      style={styles.banner}
                      source={{ uri: itemView.banner }}
                    />
                  )}
                </>
              }
              data={itemView.content}
              renderItem={({ item, index }) => {
                const isVisible = visibles.findIndex((i) => i.index == index);
                //isVisible >= 0 && console.log(isVisible, item.name)
                //console.log(item);
                return (
                  <GlobalPost
                    isVisible={isVisible >= 0 ? true : false}
                    item={item}
                  />
                );
              }}
              onViewableItemsChanged={onViewableItemsChanged.current}
            />
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
  banner: {
    height: 80,
    width: "100%",
    marginTop: 15,
    marginBottom: 0,
    borderRadius: 0,
    resizeMode: "contain",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
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
