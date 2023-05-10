import styled, { css } from 'styled-components/native';
import Text from '../Text';
//import Text from '~components/Text';
//import { TouchableOpacityProps } from 'react-native';

// interface VariantProps {
//   variant?: 'outline' | 'default';
// }

// export interface ContainerProps extends VariantProps, TouchableOpacityProps {
//   loading?: boolean;
//   disabled?: boolean;
// }

//export const Container = styled.TouchableOpacity<ContainerProps>`
export const Container = styled.TouchableOpacity`
  padding: 18px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  height: 68px;

  border: 3px ${(props) => props.theme.colors.primary};

  ${(props) =>
    props.variant !== 'outline' &&
    css`
      background-color: ${props.theme.colors.primary};
    `}
`;

//export const ButtonText = styled(Text)<VariantProps>`
export const ButtonText = styled(Text)`
  color: ${(props) =>
    props.variant === 'outline' ? props.theme.colors.primary : 'black'};
`;
