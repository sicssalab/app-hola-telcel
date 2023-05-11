import { Container } from "./styles";
import { FlatList } from "react-native";
//import mocksStory from "../../../../mocks/entretenimiento/mocksStory.json";
import Preview from "../Preview";
import { useGlobalState } from "../../../../context/StoreProvider";

const SlideStories = () => {
  const { stories } = useGlobalState();
  return (
    <Container>
      <FlatList
        data={stories.data}
        renderItem={({ item, index }) => <Preview item={item} index={index} />}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 7, paddingTop: 7 }}
      />
    </Container>
  );
};

export default SlideStories;
