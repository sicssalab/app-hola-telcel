import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactionsBar } from './component/ReactionsBar';
import PlayerFeed from './component/PlayerFeed';
import { useGlobalState } from '../../../../context/StoreProvider';

const{ height, width } = Dimensions.get('window');

export const StoryFeed = (props) => {
  const {item: itemPreview} = props;
  const { stories } = useGlobalState();
  const [currIndex, setIndex] = useState(stories.data.findIndex((item) => item.id === itemPreview.id));
  const [indexSlider, setIndexSlider] = useState(stories.data.findIndex((item) => item.id === itemPreview.id));

  const renderItem = ({item, index }) => {
    //console.log("render cada que cambie la info", index, currIndex, "play", currIndex === index)
    return(
      <View style={{ flex: 1, width: width }} key={index}>
        <PlayerFeed
          key={index} 
          videoParams={ { url : item.srcStory, name: item.name, isPlay : currIndex === index, index } }
        />
        <LinearGradient 
          colors={['rgba(0,0,0,0.1)',' rgba(0,0,0,0.6)']}
          style={ styles.bottomView }>
          <ReactionsBar item={ item }/>
        </LinearGradient>
      </View>
    )
  }

  const onChangeIndex = ({ index }) => {
    setIndex(index)
  }

  return (
    <View style={{ flex: 1 ,backgroundColor: 'black'}}>
      <StatusBar barStyle='light-content'></StatusBar>
      <SwiperFlatList 
        data={stories.data}
        renderItem={renderItem}
        //index={currIndex}
        index={indexSlider}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={ onChangeIndex }
      />
      <View style={{ position: 'absolute' , top: 25, left: 16 }}>
        <Text style={styles.textStyle}>{`Reels`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  bottomView: {
    flex: 0,
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
})
