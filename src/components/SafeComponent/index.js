import React, { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import Loading from "../Loading";
import Button from "../Button";
import { View } from "react-native";
import {
  Container,
  Content,
  Title,
  ContainedText,
  DisconnectedIllustration,
  ErrorIllustration,
} from "./styles";

//export const OfflineComponent = ({ refetch }: { refetch: () => void }) => {
export const OfflineComponent = ({ refetch }) => {
  return (
    <Container>
      <Content>
        <DisconnectedIllustration />
        <Title>Oops, estás desconectado de Internet</Title>
        <ContainedText>
          Espere un momento y vuelva a intentarlo cuando la conexión se
          reestablezca.
        </ContainedText>
        <Button onPress={() => refetch()}>Intentar nuevamente</Button>
      </Content>
    </Container>
  );
};

//export const RequestErrorComponent = ({ refetch }: { refetch: () => void }) => {
export const RequestErrorComponent = ({ refetch }) => {
  return (
    <Container>
      <Content>
        <ErrorIllustration />
        <Title>Oops, ha sucedido un error en la aplicación</Title>
        <ContainedText>
          No logramos procesar su petición en el momento, pero ya estamos
          trabajando para resolver el problema.
        </ContainedText>
        <Button onPress={() => refetch()}>Intentar nuevamente</Button>
      </Content>
    </Container>
  );
};

export const UnknownErrorComponent = () => {
  return (
    <Container>
      <Content>
        <ErrorIllustration />
        <Title>Oops, estás desconectado de Internet</Title>
        <ContainedText>
          Espere un momento y vuelva a intentarlo cuando la conexión se
          reestablezca.
        </ContainedText>
      </Content>
    </Container>
  );
};

// NetInfo is always disconnected on the first render. Workaround hook
export function useIsOffline() {
  const [netInfo, setNetInfo] = useState({
    isInternetReachable: true,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(setNetInfo);
    return unsubscribe;
  }, []);

  return !netInfo.isInternetReachable;
}

// interface SafeComponentProps {
//   request?: { data?: any, error?: any, loading?: boolean };
//   refetch?: () => void;
//   children: any;
// }

export default function SafeComponent({ request, children, refetch }) {
  const offline = useIsOffline();

  const SafeChildren = (children || null);

  if (request?.loading)
    return (
      <View style={{backgroundColor: "#f0f0f0", padding: 15}}>
        <Loading />
      </View>
    );

  if (request?.data) return SafeChildren;
  if (request && offline) return <OfflineComponent refetch={refetch} />;
  if (request?.error) return <RequestErrorComponent refetch={refetch} />;

  return SafeChildren;
}
