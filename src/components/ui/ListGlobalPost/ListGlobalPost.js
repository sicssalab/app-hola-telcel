import { View, StyleSheet, Text } from 'react-native';
import GlobalPost from '../../posts/GlobalPost/GlobalPost';

const ListGlobalPost = (props) => {
  const { items, hasbuttonLink } = props;

  const onNavigateClick = (item) => {
    const { onNavigateClick } = props;
    onNavigateClick && onNavigateClick(item);
  };

  return (
    <View style={styles.container}>
      {items &&
        items.map((item, index) => (
            // <Text key={index}>{item.name}</Text>
          <GlobalPost
            key={item.id || index}
            item={item}
            hasbuttonLink={hasbuttonLink}
            onNavigateClick={() => onNavigateClick(item)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
});
export default ListGlobalPost;
