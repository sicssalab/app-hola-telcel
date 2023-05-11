
import React, {  useEffect, useState } from 'react';
import {
  SectionList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeComponent } from '../../components';
import Divider from '../../components/Divider';
import SceneName from '../../constants/SceneName';
import GlobalPost from '../../components/posts/GlobalPost';
import StateDropdown from '../AvenuesView/components/StateDropdown';
import { Container, OptionsContainer } from '../AvenuesView/styles';
import { Header } from './components/Header';
import ServicesDropdown from "./components/ServicesDropdown";
//import data from '../../mocks/mocks-estados.json'; //TODO data son los estados nada mas
//import mocksExperiencias from "../../mocks/experiencias/mocksExperiencias.json"
import { useDispatch, useGlobalState } from '../../context/StoreProvider';
import statesListAction from '../../actions/statesListAction';
import experiencesAction from '../../actions/experiencesAction';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { statesList, experiences } = useGlobalState();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  // const states = data.states.map((state) => ({
  //   code: state.id,
  //   name: state.name,
  // }));
  // useEffect(() => {
  //   statesListAction.get({}, dispatch);
  // },[]);
  
  useEffect(() => {
    experiencesAction.get({}, dispatch);
  },[]);

  useEffect(() => {
    if(!statesList.complete && !statesList.error && !statesList.loading) {
      statesListAction.get({}, dispatch);
    }

    if(statesList.complete) {
      setStates(statesList.states.map((state) => ({
        code: state.id,
        name: state.name,
      })))
    }
  },[statesList]);

  const updateFilteredAvenuesAndPosts = (stateId, avenueId) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    //TODO busca el estado seleccionado
    const selectedState = statesList.states.find((state) => state.id === stateId);

    //TODO selecciona la lista de servicios por el estado
    const filteredAvenues = selectedState ? selectedState.services : [];

    setFilteredAvenues(filteredAvenues);

    //TODO Muesta la lista de servicios por la avenida seleccionada
    if (avenueId) {
      //TODO seleccionar todos los servicios de X estado
      const services = experiences.data.filter((servicio) => servicio.state_id === stateId && servicio.service_id === avenueId)
      setFilteredPosts(services);
    } else {
      setFilteredPosts([]);
    }
  };
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: "SERVICES_PROFILE"
      //type: "typeMockConstants.AVENUES_PROFILE"
    }
    navigation.navigate(SceneName.ProfileScreen, { profilePage });
  };
  const sections = [
    {
      title: 'Header',
      data: ['header'],
      key: 'header',
      renderItem: () => <Header />,
    },
    {
      title: 'Divider',
      data: ['divider'],
      key: 'divider',
      renderItem: () => <Divider />,
    },
    {
      title: 'OptionsContainer',
      data: ['optionsContainer'],
      key: 'optionsContainer',
      renderItem: () => (
        <OptionsContainer>
          <StateDropdown
            states={states}
            onUpdate={updateFilteredAvenuesAndPosts}
          />
          {selectedStateId && (
            <ServicesDropdown
              stateId={selectedStateId}
              onUpdate={updateFilteredAvenuesAndPosts}
              filteredAvenues={filteredAvenues}
            />
          )}
        </OptionsContainer>
      ),
    },
    {
      title: 'Posts',
      data: filteredPosts,
      key: 'posts',
      renderItem: ({ item }) => <GlobalPost item={item} onNavigateClick={() => onNavigateClick(item)} />,
    },
  ];

  return (
    <SafeComponent request={statesList}>
      <Container>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <View>{item}</View>}
          renderSectionHeader={({ section: { title } }) => <View />}
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
