import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SlideStories from "./components/SlideStories/SlideStories";
import SceneName from "../../constants/SceneName";
import { Container } from "./components/SlideStories/styles";
import ListGlobalPost from "../../components/ui/ListGlobalPost/ListGlobalPost";
//import mocksEntretenimiento from "../../mocks/entretenimiento/mocksEntretenimiento.json";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import { useEffect } from "react";
import storiesAction from "../../actions/storiesAction";
import { SafeComponent } from "../../components";
import { typeMockConstants } from "../../constants/typeMockConstants";
import entertainmentsAction from "../../actions/entertainmentsAction";

const EntertainmentView = () => {
  const navigation = useNavigation();
  const { stories, entertainments } = useGlobalState();
  const dispatch = useDispatch();
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.GROUP_PROFILE,
    };
    navigation.navigate(SceneName.GroupProfile, {profilePage}); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
  };

  useEffect(() => {
    storiesAction.get({}, dispatch);
    entertainmentsAction.get({}, dispatch);
  }, []);

  return (
    <Container>
      <SafeComponent request={stories}>
        <SlideStories />
      </SafeComponent>
      <SafeComponent request={entertainments}>
        <ListGlobalPost
          items={entertainments.data}
          applyPremium={true}
          onNavigateClick={onNavigateClick}
        />
      </SafeComponent>
    </Container>
  );
};

export default EntertainmentView;
