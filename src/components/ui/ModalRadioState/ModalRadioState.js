import { useEffect, useState } from "react";
import ModalRadio from "../../modals/ModalRadio";

const ModalRadioState = (props) => {
  const { modalVisible, } = props;
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(()=> {
    modalVisible && setShowModal(true);
  }, [modalVisible]);

  return (
    <ModalRadio
      modalVisible={showModal}
      // Loading={Loading}
      // Loaded={Loaded}
      // playMusic={playMusic}

      onClose={onShowModal}
      // onPlayAudio={PlayAudio}
      // onPauseAudio={PauseAudio}
    />
  );
};

export default ModalRadioState;
