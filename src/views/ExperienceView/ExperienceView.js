
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
import experiencesAction from '../../actions/experiencesAction';
import experiencesStatesAction from '../../actions/experiencesStatesAction';
import { typeMockConstants } from '../../constants/typeMockConstants';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { experiencesStates, experiences } = useGlobalState();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  
  useEffect(() => {
    experiencesAction.get({}, dispatch);
  },[]);

  useEffect(() => {
    if(!experiencesStates.complete && !experiencesStates.error && !experiencesStates.loading) {
      experiencesStatesAction.get({}, dispatch);
    }

    if(experiencesStates.complete) {
      setStates(experiencesStates.states.map((state) => ({
        code: state.id,
        name: state.name,
      })))
    }
  },[experiencesStates]);

  const updateFilteredAvenuesAndPosts = (stateId, avenueId) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    //TODO busca el estado seleccionado
    const selectedState = experiencesStates.states.find((state) => state.id === stateId);

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
      type: typeMockConstants.SERVICES_PROFILE,
    }
  
    navigation.navigate(SceneName.GroupProfile, { profilePage });
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
    <SafeComponent request={experiencesStates}>
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
