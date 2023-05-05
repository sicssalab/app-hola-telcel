import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
`;

const EntertainmentView = () => {
    const navigation = useNavigation();

    const onNavigateClick = (item) => {
        navigation.navigate(SceneName.GroupProfile, { id: item.id }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
    };

    return (
        <Container>
            {/* <Header /> */}
            <View>
                <Text>va el header</Text>
            </View>
            <View>
                <Text>aqui va el listado de post</Text>
            </View>
            {/* <ListGlobalPost items={mocksEntretenimiento.data} onNavigateClick={onNavigateClick} /> */}
        </Container>
    );
}

export default EntertainmentView;