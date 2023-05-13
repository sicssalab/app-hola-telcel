import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SceneName from "../../../../constants/SceneName";
import { Container, Picture, Content } from "./styles";
import { useDispatch, useGlobalState } from "../../../../context/StoreProvider";
import {Text} from "../../../../components";
import ModalPaymentPremium from "../../../../components/modals/ModalPaymentPremium/ModalPaymentPremium";
import {
  Alert, View, Image, StyleSheet
} from 'react-native';
import userAuthAction from "../../../../actions/userAuthAction";
import ModalFeedStory from "../../../../components/modals/ModalFeedStory";

const Preview = ({ item , index }) => {
  const navigation = useNavigation();
  const [showModalPremium, setShowModalPremium] = useState(false);
  const [showModalFeed, setShowModalFeed] = useState(false);
  const [userPremium, setUserPremium] = useState(false);
  const {userAuth} = useGlobalState();
  const dispatch = useDispatch();

  const showPreview = (hasUserPremium) => {
    if(!hasUserPremium)
    {
      switch(item.hasPremium) {
        case true:
          setShowModalPremium(true);
          break;
        default:
          //navigation.navigate(SceneName.Story, { user: item })
          setShowModalFeed(true);
        }
      }
      else
      {
        //navigation.navigate(SceneName.Story, { user: item })
        setShowModalFeed(true);
      }
  }
  const actionPreview = () => {
    showPreview(userPremium)
  }

  const onCloseModal = () => {
    setShowModalPremium(!showModalPremium);
  }
  const onCloseModalFeed = () => {
    setShowModalFeed(!showModalFeed);
  }
  
  useEffect(() => {
    if(userAuth.isPremium) {
      setUserPremium(true);
    }
  },[userAuth])
  
  const onClickAproved = () => {
    Alert.alert('Tu suscripción ha sido aprovada');
    onCloseModal();
    userAuthAction.premium(dispatch);
    setUserPremium(true);
    showPreview(true);
  }

  return (
    <Container onPress={actionPreview}>
      <View>
        {item.hasPremium && <Image source={require('../../../../assets/images/logo_premium.png')} style={styles.logoPremium} />}
        <Picture source={{ uri: item.srcPreview }} />
      </View>
      <Text>{item.hasPremium? 'Premium': 'Publico'}</Text>
      <Content>
        <Text fontSize='small' fontWeight='semiBold' numberOfLines={1}>
          {item.name}
        </Text>
      </Content>
      <ModalPaymentPremium showModal={showModalPremium} onCloseModal={onCloseModal} onClickAproved={onClickAproved} />
      <ModalFeedStory showModal={showModalFeed} onCloseModal={onCloseModalFeed} item={item}/>
    </Container>
  );
};

const styles = StyleSheet.create({
  logoPremium: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 3
  },
});

export default Preview;