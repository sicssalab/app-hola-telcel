import { View, StyleSheet, Text } from "react-native";
import GlobalPost from "../../posts/GlobalPost/GlobalPost";

const ListGlobalPost = (props) => {
  const { items, hasbuttonLink, applyPremium } = props;

  const onNavigateClick = (item) => {
    const { onNavigateClick } = props;
    onNavigateClick && onNavigateClick(item);
  };
  return (
    <View style={styles.container}>
      {items &&
        items.map((item, index) => {
          return (
            // <View key={index}><Text>{item.name}</Text></View>
            <GlobalPost
              key={`${item.id}${index}`}
              item={item}
              hasbuttonLink={hasbuttonLink}
              onNavigateClick={() => onNavigateClick(item)}
              applyPremium={applyPremium}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    flexDirection:"column"
  },
});
export default ListGlobalPost;
