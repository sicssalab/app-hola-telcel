import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SlideStories from "./components/SlideStories/SlideStories";
import SceneName from "../../constants/SceneName";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import { useEffect, useRef, useState } from "react";
import storiesAction from "../../actions/storiesAction";
import { typeMockConstants } from "../../constants/typeMockConstants";
import entertainmentsAction from "../../actions/entertainmentsAction";
import GlobalPost from "../../components/posts/GlobalPost/GlobalPost";

const EntertainmentView = () => {
  const navigation = useNavigation();
  const { stories, entertainments } = useGlobalState();
  const [visibles, setvisible] = useState([]);
  const dispatch = useDispatch();
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.GROUP_PROFILE,
    };
    navigation.navigate(SceneName.GroupProfile, { profilePage }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
  };

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setvisible(
      viewableItems.map((item) => {
        return {
          index: item.index,
        };
      })
    );
  });

  useEffect(() => {
    storiesAction.get({}, dispatch);
    entertainmentsAction.get({}, dispatch);
  }, []);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      ListHeaderComponentStyle={{flex:1}}
      ListHeaderComponent={
        <>
          {stories.complete && <SlideStories />}
        </>
      }
      //stickyHeaderIndices={[0,1,2]} //TODO grega como sticky el header y los indices de componentes que sigan
      data={entertainments.complete ? entertainments.data : [] }
      renderItem={({ item, index }) => {
        const isVisible = visibles.findIndex((i) => i.index == index);
        //isVisible >= 0 && console.log(isVisible, item.name)

        return (
          <GlobalPost
            isVisible={isVisible >= 0 ? true: false}
            item={item}
            onNavigateClick={() => onNavigateClick(item)}
          />
        );
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      ListFooterComponent={
        entertainments.loading ? <View><Text style={{color: "white"}}>loading...</Text></View> : <></>
      }
    />
  );
};

export default EntertainmentView;
