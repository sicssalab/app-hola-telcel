import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import {StoryFeed} from "../../../views/StoryView/components/StoryFeed";
import { Ionicons } from '@expo/vector-icons';

const ModalFeedStory = (props) => {
  const { item, showModal } = props;

  const onClose = () => {
    const { onCloseModal } = props;
    onCloseModal && onCloseModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showModal}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContainerBody}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={40} color="white" />
          </TouchableOpacity>
          <StoryFeed item={item} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#1e1e1e",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerBody: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    color: "#fff",
    fill: "#fff",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
export default ModalFeedStory;
