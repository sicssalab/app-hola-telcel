import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SceneName from "../../constants/SceneName";
import Text from "../../components/Text";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "styled-components/native";
import { Input, RadioButtons } from "../../components";
import { useNavbarStyle } from "../../components/NavbarTabHeader";
import PhoneInput from "../LoginView/components/PhoneInput";
import { BottomPadding, Container, ContinueButton } from "./styles";

// export const useCustomBottomInset = () => {
//   const insets = useSafeAreaInsets();
//   return Math.max(20, insets.bottom + 5);
// };

const RegistrationView = ({ route }) => {
  const themeContext = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const headerHeight = useHeaderHeight();
  const navbarHeight = 68;

  const continueButtonDisabled = Boolean(!gender);

  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
  };

  const handleRegister = async () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate(SceneName.Home);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        keyboardVerticalOffset={
          route?.name === SceneName.Registration ? headerHeight : navbarHeight
        }
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <Container
          style={{ flex: 1, marginTop: 20 }}
          contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
        >
          <StatusBar style={themeContext.dark ? "light" : "dark"} />
          <Text fontWeight="bold" fontSize="large" style={{ marginTop: 20 }}>
            Tú número de teléfono telcel
          </Text>
          <PhoneInput
            enablesReturnKeyAutomatically
            returnKeyType="send"
            onPhoneNumberChange={handlePhoneNumberChange}
            blurOnSubmit={false}
            placeholder="(999) 9999-999"
          />
          <Input
            title="Mi nombre"
            placeholder="Escribe tu nombre completo"
            value={name}
            onChangeText={setName}
            maxLength={50}
          />
          <Input
            title="Algo sobre mi"
            placeholder="¡Cuéntanos algo interesante de ti!"
            value={bio}
            onChangeText={setBio}
            maxLength={500}
            multiline
          />
          <RadioButtons
            title="Sexo"
            data={["Hombre", "Mujer", "Otro"]}
            value={gender}
            onChange={setGender}
          />
        </Container>
        <ContinueButton
          disabled={continueButtonDisabled}
          loading={loading}
          onPress={handleRegister}
        >
          Registrarse
        </ContinueButton>
      </KeyboardAvoidingView>
      <BottomPadding
        disabled={continueButtonDisabled}
        style={{ height: insets.bottom }}
      />
    </>
  );
};

export default RegistrationView;
