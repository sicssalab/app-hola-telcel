import styled from 'styled-components/native';

export const Content = styled.View`
  width: 100px;
  align-items: center;
  height: 30px;
`;

export const Picture = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 5px;
  margin-bottom: 5px;

  background-color: ${(props) => props.theme.colors.border};
`;

export const Container = styled.TouchableOpacity`
  margin: 4px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;