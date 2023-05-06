import React from "react";
import { useNavigation } from "@react-navigation/native";
import SceneName from "../../../../theme/constants/SceneName";
import { Container, Picture, Content } from "./styles";
import {TextDefault, Text} from "../../../../components";

const Preview = (props) => {
    const {item} = props;
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate(SceneName.Story, { user: item })}>
      <Picture source={{ uri: item.srcPreview }} />
      <Content>
        <Text  style={{color: "white"}} fontSize="small" fontWeight="semiBold" numberOfLines={1}>
          {item.name}
        </Text>
      </Content>
    </Container>
  );
};

export default Preview;
