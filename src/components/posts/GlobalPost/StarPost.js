import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { SvgUri } from 'react-native-svg';
import settings from '../../../settings';

const StarPost = (props) => {
  const themeContext = useContext(ThemeContext);
  const { stars } = props;
  return (
    <View style={styles.container}>
      {stars &&
        Array.from({ length: stars }, (v, i) => {
          //return <StarFillIcon key={i} width={20} height={20} fill={"gold"} />;
          return <SvgUri width={20} height={20}
          uri={`${settings.domainImage}icons/star_FILL.${settings.typeImage}`}
        />;
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
