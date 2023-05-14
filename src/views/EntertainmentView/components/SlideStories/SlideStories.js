import { Container } from "./styles";
import { FlatList } from "react-native";
//import mocksStory from "../../../../mocks/entretenimiento/mocksStory.json";
import Preview from "../Preview";
import { useGlobalState } from "../../../../context/StoreProvider";
import ModalFeedStory from "../../../../components/modals/ModalFeedStory/ModalFeedStory";
import { useState } from "react";

const SlideStories = () => {
  const { stories } = useGlobalState();
  const [showModalFeed, setShowModalFeed] = useState(false);
  const [itemView, setItemView] = useState(false);

  const onPressPreview = (item) => {
    setItemView(item);
    onCloseModalFeed();
  }

  const onCloseModalFeed = () => {
    setShowModalFeed(!showModalFeed);
  }

  return (
    <Container>
      <FlatList
        nestedScrollEnabled
        data={stories.data}
        renderItem={({ item, index }) => <Preview item={item} index={index} onPressPreview={onPressPreview} />}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 7, paddingTop: 7 }}
      />
      <ModalFeedStory showModal={showModalFeed} onCloseModal={onCloseModalFeed} item={itemView}/>
    </Container>
  );
};

export default SlideStories;
