import React, { useEffect, useRef, useState } from "react";
import { FlatList, SectionList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeComponent } from "../../components";
import Divider from "../../components/Divider";
import SceneName from "../../constants/SceneName";
import GlobalPost from "../../components/posts/GlobalPost";
import StateDropdown from "../AvenuesView/components/StateDropdown";
import { Container, OptionsContainer } from "../AvenuesView/styles";
import { Header } from "./components/Header";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import mallsStatesAction from "../../actions/mallsStatesAction";
import { typeMockConstants } from "../../constants/typeMockConstants";

function Component() {
  const navigation = useNavigation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { mallsStates } = useGlobalState();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [visibles, setvisible] = useState([]);
  useEffect(() => {
    mallsStatesAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    if (!mallsStates.complete && !mallsStates.error && !mallsStates.loading) {
      mallsStatesAction.get({}, dispatch);
    }

    if (mallsStates.complete) {
      setStates(
        mallsStates.states.map((state) => ({
          code: state.id,
          name: state.name,
        }))
      );
    }
  }, [mallsStates]);

  const updateFilteredAvenuesAndPosts = (stateId, _avenueId) => {
    setFilteredPosts([]);

    //TODO busca el estado seleccionado
    const selectedState = mallsStates.states.find(
      (state) => state.id === stateId
    );

    //TODO selecciona la lista de servicios por el estado
    const filteredAvenues = selectedState ? selectedState.items : [];
    setFilteredPosts(filteredAvenues);
  };

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.MALL_PROFILE,
    };

    navigation.navigate(SceneName.GroupProfile, { profilePage });
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
  return (
    <SafeComponent request={mallsStates}>
      <Container>
        <FlatList
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <Header />
              <OptionsContainer>
                <StateDropdown
                  states={states}
                  onUpdate={updateFilteredAvenuesAndPosts}
                />
              </OptionsContainer>
            </>
          }
          data={filteredPosts}
          renderItem={({ item, index }) => {
            const isVisible = visibles.findIndex((i) => i.index == index);
            //isVisible >= 0 && console.log(isVisible, item.name);

            return (
              <GlobalPost
                isVisible={isVisible >= 0 ? true : false}
                item={item}
                onNavigateClick={() => onNavigateClick(item)}
              />
            );
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
