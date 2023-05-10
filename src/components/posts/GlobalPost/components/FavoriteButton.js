import { useContext, useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { SvgUri } from 'react-native-svg';
import settings from '../../../../settings';

const FavoriteButton = () => {
  const themeContext = useContext(ThemeContext);
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <TouchableOpacity style={styles.actionSection} onPress={onClick}>
      {/* {active && <StarIcon width={20} height={20} />} */}
      {active && <SvgUri width={20} height={20}
                  uri={`${settings.domainImage}icons/general/star.${settings.typeImage}`}
                />}
      {!active && (
        // <StarFillIcon width={20} height={20} fill={themeContext.colors.text} />
        <SvgUri width={20} height={20}
                  uri={`${settings.domainImage}icons/star_FILL.${settings.typeImage}`}
                />
      )}
      <Text style={styles.reactionText}>
        {!active ? 'Agregar este contenido a favoritos' : 'Quitar este contenido a favoritos'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionSection: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  reactionText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default FavoriteButton;
