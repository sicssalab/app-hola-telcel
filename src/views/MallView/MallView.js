
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
import { useDispatch, useGlobalState } from '../../context/StoreProvider';
import mallsStatesAction from '../../actions/mallsStatesAction';
import { typeMockConstants } from '../../constants/typeMockConstants';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { mallsStates } = useGlobalState();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  
  useEffect(() => {
    mallsStatesAction.get({}, dispatch);
  },[]);

  useEffect(() => {
    if(!mallsStates.complete && !mallsStates.error && !mallsStates.loading) {
      mallsStatesAction.get({}, dispatch);
    }

    if(mallsStates.complete) {
      setStates(mallsStates.states.map((state) => ({
        code: state.id,
        name: state.name,
      })))
    }
  },[mallsStates]);

  const updateFilteredAvenuesAndPosts = (stateId, _avenueId) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    //TODO busca el estado seleccionado
    const selectedState = mallsStates.states.find((state) => state.id === stateId);

    //TODO selecciona la lista de servicios por el estado
    const filteredAvenues = selectedState ? selectedState.items : [];
    setFilteredPosts(filteredAvenues);
  };
  
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.MALL_PROFILE,
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
    <SafeComponent request={mallsStates}>
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
