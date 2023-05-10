import React, { useContext, useState, useEffect } from 'react';
import {
  SectionList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SceneName from '../../constants/SceneName';
import GlobalPost from '../../components/posts/GlobalPost';
import Divider from '../../components/Divider';
import AvenueDropdown from './components/AvenueDropdown';
import { Header } from './components/Header';
import { Input } from './components/Input';
import StateDropdown from './components/StateDropdown';
//import { SafeComponent } from '~components';
import { SafeComponent } from '../../components';
//import { mockRequest } from './__mocks__';

import data from '../../mocks/mocks-estados.json';

import { Container, OptionsContainer } from './styles';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedAvenueId, setSelectedAvenueId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const states = data.states.map((state) => ({
    code: state.id,
    name: state.name,
  }));

  const updateFilteredAvenuesAndPosts = (stateId, avenueId) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    const selectedState = data.states.find((state) => state.id === stateId);
    const filteredAvenues = selectedState ? selectedState.avenues : [];

    setFilteredAvenues(filteredAvenues);

    if (avenueId) {
      setSelectedAvenueId(avenueId)
      const selectedAvenue = filteredAvenues.find(
        (avenue) => avenue.id === avenueId,
      );
      const filteredPosts = selectedAvenue ? selectedAvenue.content : [];
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts([]);
    }
  };

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: "AVENUES_PROFILE"
      //type: "typeMockConstants.AVENUES_PROFILE"
    }
    navigation.navigate(SceneName.ProfileScreen, { profilePage });
  };
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
  const onChangeInput = (e) => {
    //TODO de la busqueda filtrar los que son con el nombre
    setKeyword(e);
    //TODO selec
    if(selectedStateId > 0 && selectedAvenueId > 0) {
      const selectedState = data.states.find((state) => state.id === selectedStateId);
      const filteredAvenues = selectedState ? selectedState.avenues : [];
      const selectedAvenue = filteredAvenues.find(
        (avenue) => avenue.id === selectedAvenueId,
      );
  
      if(e == "") setFilteredPosts(selectedAvenue.content)
      else
        setFilteredPosts(
          selectedAvenue.content.filter((servicio) =>
          removeAccents(servicio.name.toLowerCase()).indexOf(removeAccents(e.toLowerCase())) >= 0
          )
        )
      
    }
  }

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
            //onUpdate={updateFilteredState}
            onUpdate={updateFilteredAvenuesAndPosts}
          />
          {selectedStateId && (
            <AvenueDropdown
              stateId={selectedStateId}
              onUpdate={updateFilteredAvenuesAndPosts}
              //onUpdate={updateFilteredAvenues}
              filteredAvenues={filteredAvenues}
            />
          )}
          <Input
            placeholder='¿Qué estás buscando?'
            value={keyword}
            //onChangeText={setKeyword}
            onChangeText={onChangeInput}
            maxLength={500}
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

  //TODO de mockRequest
  const mockSageComponentFake = {
    data: true,
    loading: false,
    error: false,
  }
  return (
    <SafeComponent request={mockSageComponentFake}>
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
