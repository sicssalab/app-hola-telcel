import { Container } from "./styles";
import { FlatList } from "react-native";
import mocksStory from "../../../../mocks/entretenimiento/mocksStory.json";
import Preview from "../Preview";

const SlideStories = () => {

  return (
    <Container>
      <FlatList
        data={mocksStory.data}
        renderItem={({ item, index }) => <Preview item={item} index={index} />}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 7, paddingTop: 7 }}
      />
    </Container>
  );
};

export default SlideStories;
