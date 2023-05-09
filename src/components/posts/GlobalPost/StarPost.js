import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
//import StarIcon from '../../../assets/icons/general/star.svg';
import StarFillIcon from '../../../assets/icons/star_FILL.svg';

const StarPost = (props) => {
  const themeContext = useContext(ThemeContext);
  const { stars } = props;
  return (
    <View style={styles.container}>
      {stars &&
        Array.from({ length: stars }, (v, i) => {
          //return <StarIcon key={i} width={20} height={20} />;
          return <StarFillIcon key={i} width={20} height={20} fill={"gold"} />;
        })}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginHorizontal:10,
      marginBottom: 10
    },
  });
export default StarPost;
