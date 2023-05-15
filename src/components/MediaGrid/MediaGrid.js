import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import VideoInMedia from "./VideoInMedia";
import ModalPaymentPremium from "../modals/ModalPaymentPremium";
import { useDispatch, useGlobalState } from "../../context/StoreProvider";
import userAuthAction from "../../actions/userAuthAction";

//TODO array lista de links de videos
const MediaGrid = ({ array, itemView, isVisible }) => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [showModalPremium, setShowModalPremium] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [holdVideo, setHoldVideo] = useState(isVisible);
  const { userAuth } = useGlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    const result = thumbnailsResources(array);
    setResources(result.slice(0, 3));
  }, [array]);

  useEffect(() => {
    if(isVisible)
      setHoldVideo(true);
  },[isVisible])

  const thumbnailsResources = (array) => {
    const resourceMedia = array.map((url) => {
      return {
        type: "video",
        uri: url,
      };
    });

    setLoading(false);
    return resourceMedia;
  };
  const onCloseModal = () => {
    setShowModalPremium(!showModalPremium);
  };

  useEffect(() => {
    if (userAuth.isPremium) {
      setShowPreview(true);
    }
  }, [userAuth]);

  //TODO acepto el cargo premium
  const onClickAproved = () => {
    Alert.alert("Tu suscripción ha sido aprovada");
    userAuthAction.premium(dispatch);
    onCloseModal();
    setShowPreview(true);
  };

  const RenderLoading = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      </View>
    );
  };

  return (
    <View>
      {loading && <RenderLoading />}
      {!loading && (
        <View style={styles.mediaContainer}>
          {resources.length > 0 && (
            <View style={[styles.bigResource, styles.bigResourceContainer]}>
              {itemView && itemView.hasActiveStreaming && (
                <View
                  style={{
                    top: 15,
                    left: 15,
                    zIndex: 1,
                    position: "absolute",
                  }}
                >
                  <Image
                    source={require("../../assets/images/envivo.gif")}
                    style={{
                      width: 75,
                      height: 40,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              )}
              {holdVideo && (
                <VideoInMedia
                  videoData={resources[0]}
                  autoPlay={false}
                  itemView={itemView}
                  onPress={onCloseModal}
                  showPreview={showPreview}
                />
              )}
            </View>
          )}
        </View>
      )}
      <ModalPaymentPremium
        showModal={showModalPremium}
        onCloseModal={onCloseModal}
        onClickAproved={onClickAproved}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
    minHeight: 250
  },
  bigResourceContainer: {
    width: "100%",
    minHeight: 350,
    height: 350,
    marginVertical: 3,
  },
  bigResource: {
    flex: 1,
  },
  playIconBigContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  smallResourceContainer: {
    aspectRatio: 1,
    width: "49%",
  },
  marginRight: {
    marginHorizontal: 0,
  },
  smallResource: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 250,
    marginVertical: 0,
  },
  videoPlayer: {
    alignSelf: "center",
    width: "100%",
    height: 250,
  },
  modalContainer: {
    backgroundColor: "#1e1e1e",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
    marginVertical: 10,
  },
  modalVideo: {
    width: "100%",
    height: 300,
    marginVertical: 10,
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    color: "#fff",
    fill: "#fff",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  profileButton: {
    backgroundColor: "#f5df4d",
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 0,
  },
  profileButtonText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  loader: {
    marginTop: 10,
  },
});

export default MediaGrid;
