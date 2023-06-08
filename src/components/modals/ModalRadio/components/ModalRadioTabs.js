import { useEffect, useState } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import RadioContent from './RadioContent';
import RadioContent247 from './RadioContent247';
import mockEstaciones from "../../../../mocks/mocksEstaciones";

const ModalRadioTabs = (props) => {
  const {playlistTab, itemsPlaylistTab} = props;
  const [stateRadio, setStateRadio] = useState({
    index: 0,
    routes: [ ...playlistTab.map((item) => {
      return {
        key: `${item.type}View`,
        title: item.name
      }
    })]
  })
  
  const onPressPlayMusicItem = (type, id) => {
    //TODO regresa el typo play y el id dentro de la lista
    const {onPressPlayMusicItem} = props;
    
    onPressPlayMusicItem && onPressPlayMusicItem(type, id);
  }

  const PlayAudio = (type, response) => {
    const { onPlayAudio } = props;
    const aux = {...response, type}
    onPlayAudio && onPlayAudio(aux);
  };
  const PauseAudio = () => {
    const { onPauseAudio } = props;
    onPauseAudio && onPauseAudio();
  };

  const contentRadioPlay = () => <RadioContent247
   item={itemsPlaylistTab.find((item) => item.type === "radio")}
   onPlayAudio={(response) => PlayAudio("radio", response)}
   onPauseAudio={PauseAudio}
   />
  const contentPodcastPlay = () => <RadioContent onClick={(response) => onPressPlayMusicItem("podcast", response)} items={mockEstaciones.podcast.data} />
  const contentMusicPlay = () => <RadioContent onClick={(response) => onPressPlayMusicItem("music", response)} items={mockEstaciones.music.data} />

  const onClickTab = (i) => {
    const {onClickTab} = props;
    setStateRadio({
        ...stateRadio,
        index: i,
    })
    onClickTab && onClickTab();
  };

  const renderTabBar = (props) => {
    const renderTabProps = props;

    return (
      <View style={styles.tabBar}>
        {renderTabProps.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity key={i}
              style={styles.tabItem}
              onPress={() => onClickTab(i)}>
              <Animated.Text style={{color: "white"}}
              >{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  const renderScene = () => {
    const render = {}

    playlistTab.map((item) => {
      switch(item.type) {
        case 'radio':
          render[`${item.type}View`] = contentRadioPlay;
          break;
        case 'podcast':
          render[`${item.type}View`] = contentPodcastPlay;
          break;
        case 'live':
          render[`${item.type}View`] = contentMusicPlay;
          break;
      }
    });
    return SceneMap(render);
  }

  return (
    <TabView
      navigationState={stateRadio}
      renderScene={renderScene()}
      renderTabBar={renderTabBar}
      onIndexChange={onClickTab}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    borderBottomColor: "gold",
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    color: "white"
  },
});
export default ModalRadioTabs;
