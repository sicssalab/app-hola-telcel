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
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import SceneName from '../../constants/SceneName';
import ListGlobalPost from '../../components/ui/ListGlobalPost/ListGlobalPost';
import HeaderGroupSectionScreen from './components/HeaderGroupSectionScreen';
import groupsUrbans from "../../mocks/groups-urban.json";

const GroupUrbanView = (props) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const [itemView, setItemView] = useState([]);

  useEffect(() => {
    setItemView(
        groupsUrbans.data.find(
        (perfil) => perfil.id == props.route.params.id,
      ),
    );
  }, [props.route.params.id]);

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: "GROUP_PROFILE"
    }
    navigation.navigate(SceneName.ProfileScreen, {profilePage});
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.secondaryBackground}}>
      <SafeAreaView style={{ flex: 1}}>
        <HeaderGroupSectionScreen item={
            itemView
              ? itemView
              : {
                  name: 'regresar',
                }
          } />
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
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.secondaryBackground,
            }}
            showsVerticalScrollIndicator={false}>
            <Image style={styles.profileCover} source={{ uri: itemView.profileCover }} />
            <Text style={styles.userName}>{itemView.name}</Text>
            <Text style={styles.aboutUser}>
              {itemView.hasPremium ? 'Privado' : 'Publico'}
              {itemView.members ? ` - ${itemView.members} miembros` : ''}
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
                <Text style={styles.userInfoTitle}>{itemView.content?.length}</Text>
                <Text style={styles.userInfoSubTitle}>Publicaciones</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>{itemView.members}</Text>
                <Text style={styles.userInfoSubTitle}>Seguidos</Text>
              </View>
            </View>
            <ListGlobalPost items={itemView.content} onNavigateClick={onNavigateClick} />
          </ScrollView>
        )}
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
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
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
export default GroupUrbanView;



 