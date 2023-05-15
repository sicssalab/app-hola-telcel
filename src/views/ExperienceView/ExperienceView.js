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
import ServicesDropdown from "./components/ServicesDropdown";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import experiencesAction from "../../actions/experiencesAction";
import experiencesStatesAction from "../../actions/experiencesStatesAction";
import { typeMockConstants } from "../../constants/typeMockConstants";

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { experiencesStates, experiences } = useGlobalState();
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const [visibles, setvisible] = useState([]);

  useEffect(() => {
    experiencesAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    if (
      !experiencesStates.complete &&
      !experiencesStates.error &&
      !experiencesStates.loading
    ) {
      experiencesStatesAction.get({}, dispatch);
    }

    if (experiencesStates.complete) {
      setStates(
        experiencesStates.states.map((state) => ({
          code: state.id,
          name: state.name,
        }))
      );
    }
  }, [experiencesStates]);

  const updateFilteredAvenuesAndPosts = (stateId, avenueId) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    //TODO busca el estado seleccionado
    const selectedState = experiencesStates.states.find(
      (state) => state.id === stateId
    );

    //TODO selecciona la lista de servicios por el estado
    const filteredAvenues = selectedState ? selectedState.services : [];

    setFilteredAvenues(filteredAvenues);

    //TODO Muesta la lista de servicios por la avenida seleccionada
    if (avenueId) {
      //TODO seleccionar todos los servicios de X estado
      const services = experiences.data.filter(
        (servicio) =>
          servicio.state_id === stateId && servicio.service_id === avenueId
      );
      setFilteredPosts(services);
    } else {
      setFilteredPosts([]);
    }
  };

  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: typeMockConstants.SERVICES_PROFILE,
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
    <SafeComponent request={experiencesStates}>
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
                {selectedStateId && (
                  <ServicesDropdown
                    stateId={selectedStateId}
                    onUpdate={updateFilteredAvenuesAndPosts}
                    filteredAvenues={filteredAvenues}
                  />
                )}
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
