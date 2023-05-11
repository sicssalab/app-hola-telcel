import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import ListGlobalPost from '../../components/ui/ListGlobalPost';
import { typeMockConstants } from '../../constants/typeMockConstants';
import HeaderGroupSectionScreen from "../../views/GroupUrbanView/components/HeaderGroupSectionScreen";

//import mockAvenidasPerfiles from '../../mocks/mockAvenidasPerfiles.json';
//import { mockPerfiles } from '../../mocks/mockPerfiles';
//import mocksExperienciasPerfiles from "../../mocks/experiencias/mocksExperienciasPerfiles.json";
//import mockPueblosMagicosPerfiles from "../../mocks/pueblos-magicos/mocksPueblosMagicosPerfiles.json"
import experienceProfileListAction from '../../actions/experienceProfileListAction';
import avenueProfileListAction from '../../actions/avenueProfileListAction';
import { useDispatch, useGlobalState } from '../../context/StoreProvider';
import { SafeComponent } from '../../components';
import magicTownProfileListAction from '../../actions/magicTownProfileListAction';

const ProfileUrbanView = (props) => {
  const { colors } = useContext(ThemeContext);
  const [itemView, setItemView] = useState({});
  const { avenueProfileList, experienceProfileList, magicTownProfileList } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    avenueProfileListAction.get({}, dispatch);
    experienceProfileListAction.get({}, dispatch);
    magicTownProfileListAction.get({}, dispatch);
  },[]);
  
  useEffect(() => {
    switch(props.route.params.profilePage.type) {
      // case typeMockConstants.GROUP_PROFILE:
      //   setItemView(
      //     mockPerfiles.data.find(
      //       (perfil) => perfil.id == props.route.params.profilePage.id,
      //     ),
      //   );
      //   break;
      case typeMockConstants.AVENUES_PROFILE:
        setItemView(
          avenueProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      case typeMockConstants.SERVICES_PROFILE:
        setItemView(
          experienceProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      case typeMockConstants.MAGIC_TOWNS_PROFILE:
        setItemView(
          magicTownProfileList.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      default:
    }
  },[props.route.params.profilePage, avenueProfileList, experienceProfileList, magicTownProfileList]);
  //}, [props.route.params.profilePage]);

  const returnDataSafe = () => {
    switch(props.route.params.profilePage.type) {
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
                  name: 'regresar',
                }
          }
        />
        {!itemView && (
          <View>
            <Text style={styles.userInfoSubTitle}>
              Ups! no se encontro el perfil seleccionado
            </Text>
          </View>
        )}
        <SafeComponent request={returnDataSafe()}>
          {itemView && (
            <ScrollView
              style={styles.container}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondaryBackground,
              }}
              showsVerticalScrollIndicator={false}>
              {itemView.picture && itemView.picture != '' && (
                <Image
                  style={styles.userImg}
                  source={{ uri: itemView.picture }}
                />
              )}
              <Text style={styles.userName}>{itemView.name}</Text>
              <Text style={styles.aboutUser}>{itemView?.description}</Text>
              <View style={styles.userBtnWrapper}>
                <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                  <Text style={styles.userBtnTxt}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                  <Text style={styles.userBtnTxt}>Follow</Text>
                </TouchableOpacity>
              </View>
              {/* posts.length */}
              <View style={styles.userInfoWrapper}>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>{3}</Text>
                  <Text style={styles.userInfoSubTitle}>Publicaciones</Text>
                </View>
                <View style={styles.userInfoItem}>
                  {(itemView.information && itemView.information.members) && (
                    <Text style={styles.userInfoTitle}>
                      {itemView.information.members}
                    </Text>
                  )}
                  {(itemView.members) && (
                    <Text style={styles.userInfoTitle}>
                      {itemView.members}
                    </Text>
                  )}
                  <Text style={styles.userInfoSubTitle}>Miembros</Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>100</Text>
                  <Text style={styles.userInfoSubTitle}>Seguidos</Text>
                </View>
              </View>
              {/* //TODO hay que recuperar el mock por categoria:urban:grupo y mandarlo ya que tiene estatico el de entretenimiento por ahora */}
              <ListGlobalPost items={itemView.content} hasbuttonLink={false} />
            </ScrollView>
          )}
        </SafeComponent>
      </SafeAreaView>
    </View>
  );
};

export default ProfileUrbanView;

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
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#FFF',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#666',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

 