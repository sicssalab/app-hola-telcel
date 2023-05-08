import { View, Text } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import SlideStories from './components/SlideStories/SlideStories';
import SceneName from '../../constants/SceneName';
import { Container } from './components/SlideStories/styles';
import ListGlobalPost from '../../components/ui/ListGlobalPost/ListGlobalPost';
import mocksEntretenimiento from "../../mocks/entretenimiento/mocksEntretenimiento.json";

const EntertainmentView = () => {
    const navigation = useNavigation();

    const onNavigateClick = (item) => {
        navigation.navigate(SceneName.GroupProfile, { id: item.id }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
    };

    return (
        <Container>
            <SlideStories />
            <ListGlobalPost items={mocksEntretenimiento.data} onNavigateClick={onNavigateClick} />
        </Container>
    );
}

export default EntertainmentView;