import { View, StyleSheet, Text, FlatList } from "react-native";
import GlobalPost from "../../posts/GlobalPost/GlobalPost";
import { useRef, useState } from "react";

const ListGlobalPost = (props) => {
  const { items } = props;
  const [visibles, setvisible] = useState([]);
  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setvisible(
      viewableItems.map((item) => {
        return {
          index: item.index,
        };
      })
    );
  });

  const onNavigateClick = (item) => {
    const { onNavigateClick } = props;
    onNavigateClick && onNavigateClick(item);
  };
  return (
    <View style={styles.container}>
      {/* {items &&
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
        })} */}
        
      <FlatList
        style={{ flex: 1, backgroundColor: "red" }}
        data={items}
        //nestedScrollEnabled={true}
        renderItem={({ item, index }) => {
          const isVisible = visibles.findIndex((i) => i.index == index);
          //return <Contenido item={item} isVisible={isVisible >= 0 ? true: false} />
          isVisible >= 0 && console.log(isVisible, item.name)

          return (
            // <GlobalPost
            //   isVisible={isVisible >= 0 ? true: false}
            //   //key={`${item.id}${index}`}
            //   item={item}
            //   onNavigateClick={() => onNavigateClick(item)}
            // />
            <View style={{height: 400}}><Text>{item.name}</Text></View>
          );
        }}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    flexDirection: "column",
  },
});
export default ListGlobalPost;
