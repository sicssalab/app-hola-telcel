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
import { SafeComponent } from '../../components';
//import statesList from '../../mocks/mocks-estados.json';

import { Container, OptionsContainer } from './styles';
import { useDispatch, useGlobalState } from '../../context/StoreProvider';
import statesListAction from '../../actions/statesListAction';
import NoFoundResult from '../../components/ui/NoFoundResult/NoFoundResult';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedAvenueId, setSelectedAvenueId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { statesList } = useGlobalState();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);

  useEffect(() => {
    statesListAction.get({}, dispatch);
  },[]);

  useEffect(() => {
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

    const selectedState = statesList.states.find((state) => state.id === stateId);
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
      const selectedState = statesList.states.find((state) => state.id === selectedStateId);
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

  return (
    <SafeComponent request={statesList}>
      <Container>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <View>{item}</View>}
          renderSectionHeader={({ section: { title } }) => <View />}
          renderSectionFooter={({ section }) => <NoFoundResult section={section} valueSearch={keyword} />}
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
