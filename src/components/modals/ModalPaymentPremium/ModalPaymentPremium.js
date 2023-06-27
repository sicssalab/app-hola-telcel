import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import styled from 'styled-components/native';

const ModalPaymentPremium = (props) => {
  const { showModal } = props;

  useEffect(() => {}, []);
  const onCloseModal = () => {
    const { onCloseModal } = props;
    onCloseModal && onCloseModal();
  };

  const aceptPaymentModal = () => {
    const {onClickAproved} = props;
    onClickAproved && onClickAproved();
  }

  return (
    <ContentModal>
      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              El contenido que intentas visualizar, es contenido Premium. La
              suscripción tiene un costo de $ 99.00 mxn al mes.
              con cargo a tu recibo.
            </Text>
            <View style={styles.fixToText}>
              <Pressable
                style={[styles.button, styles.buttonAcept]}
                onPress={aceptPaymentModal}>
                <Text style={styles.textStyle}>Aceptar suscripción</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={onCloseModal}>
                <Text style={styles.textStyleClose}>No quiero este beneficio</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ContentModal>
  );
};

const ContentModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    marginBottom: 10
  },
  buttonAcept: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    //backgroundColor: '#2196F3',
    backgroundColor: 'transparent',
  },
  fixToText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleClose: {
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default ModalPaymentPremium;
