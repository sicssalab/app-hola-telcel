import { useState, useContext } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { SvgUri } from 'react-native-svg';
import settings from '../../../../settings';

const NotificationButton = () => {
  const [active, setActive] = useState(false);
  const themeContext = useContext(ThemeContext);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <TouchableOpacity
      style={styles.actionSection}
      onPress={onClick}>
      {/* <NotificationIcon
        width={20}
        height={20}
        fill={!active ? themeContext.colors.text :  "gold"}
      /> */}
      <SvgUri width={20} height={20}
                  uri={`${settings.domainImage}icons/notifications_active.${settings.typeImage}`}
                />
      <Text style={styles.reactionText}>
        {!active ? 'Activar notificaciones de esta publicación': 'Quitar de notificaciones de esta publicación'}
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
    paddingVertical: 10,
  },
  reactionText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default NotificationButton;
