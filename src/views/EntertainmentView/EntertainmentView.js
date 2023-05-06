import { View, Text } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import SlideStories from './components/SlideStories/SlideStories';
//import SceneName from '../../theme/constants/SceneName';
import { Container } from './components/SlideStories/styles';

// const Container = styled.ScrollView`
//   background-color: ${(props) => props.theme.colors.background};
//   flex: 1;
// `;

const EntertainmentView = () => {
    const navigation = useNavigation();

    // const onNavigateClick = (item) => {
    //     navigation.navigate(SceneName.GroupProfile, { id: item.id }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
    // };

    return (
        <Container>
            <SlideStories />
            <View>
                <Text>aqui va el listado de post</Text>
            </View>
            {/* <ListGlobalPost items={mocksEntretenimiento.data} onNavigateClick={onNavigateClick} /> */}
        </Container>
    );
}

export default EntertainmentView;