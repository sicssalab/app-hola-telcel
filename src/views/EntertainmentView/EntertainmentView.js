import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SlideStories from './components/SlideStories/SlideStories';
import SceneName from '../../constants/SceneName';
import { Container } from './components/SlideStories/styles';
import ListGlobalPost from '../../components/ui/ListGlobalPost/ListGlobalPost';
import mocksEntretenimiento from "../../mocks/entretenimiento/mocksEntretenimiento.json";
import { useDispatch, useGlobalState } from '../../context/StoreProvider';
import { useEffect } from 'react';
import storiesAction from '../../actions/storiesAction';
import { SafeComponent } from '../../components';

const EntertainmentView = () => {
    const navigation = useNavigation();
    const {stories} = useGlobalState();
    const dispatch = useDispatch();
    const onNavigateClick = (item) => {
        navigation.navigate(SceneName.GroupProfile, { id: item.id }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
    };

    useEffect(() => {
        storiesAction.get({}, dispatch);
    },[]);

    return (
        <Container>
            <SafeComponent request={stories}>
                <SlideStories />
            </SafeComponent>
            <ListGlobalPost items={mocksEntretenimiento.data} applyPremium={true} onNavigateClick={onNavigateClick} />
        </Container>
    );
}

export default EntertainmentView;