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
import { Container, OptionsContainer } from '../AvenuesView/styles';
import { Input } from '../AvenuesView/components/Input';
import { Header } from './components/Header';
import mockPueblosMagicos from "../../mocks/pueblos-magicos/mocksPueblosMagicos.json";

const MagicTownsView = () => {
  const navigation = useNavigation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [valueSearch, setValueSearch] = useState('');

  useEffect(() => {
    setFilteredPosts(mockPueblosMagicos.data.content)
  }, []);

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: "MAGIC_TOWNS_PROFILE"
    }
    navigation.navigate(SceneName.ProfileScreen, { profilePage });
  };
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
  const onChangeInput = (e) => {
    //TODO de la busqueda filtrar los que son con el nombre
    setValueSearch(e);
    if(e == "") setFilteredPosts(mockPueblosMagicos.data.content)
    else
      setFilteredPosts(
        mockPueblosMagicos.data.content.filter((servicio) => 
        //removeAccents(servicio.name.toUpperCase()) >= removeAccents(e.toUpperCase())
        removeAccents(servicio.name.toLowerCase()).indexOf(removeAccents(e.toLowerCase())) >= 0
        )
      )
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
          <Input
            placeholder='Buscar'
            value={valueSearch}
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

export default MagicTownsView;
