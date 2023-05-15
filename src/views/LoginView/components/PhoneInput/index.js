import React, { useCallback, useState } from 'react';
import { MaskService } from 'react-native-masked-text';

import {
  Container,
  TextInput,
  CountryCodeContainer,
  MobileIcon,
  Separator,
} from './styles';

// interface PhoneInputProps extends TextInputProps {
//   onPhoneNumberChange: (phoneNumber: string) => void;
// }

const PhoneInput = ({
  onPhoneNumberChange,
  ...props
}) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const formatPhone = useCallback(
    (tel) => {
      const formattedNumber = MaskService.toMask('cel-phone', tel || '', {
        maskType: 'BRL',
        withDDD: true,
        dddMask: '(999) ',
      });
      setPhoneNumber(formattedNumber);
      onPhoneNumberChange(formattedNumber);
    },
    [onPhoneNumberChange],
  );

  return (
    <Container>
      <CountryCodeContainer>
        <MobileIcon />
      </CountryCodeContainer>
      <Separator />
      <TextInput
        keyboardType='number-pad'
        textContentType='telephoneNumber'
        value={phoneNumber}
        onChangeText={formatPhone}
        maxLength={14}
        {...props}
      />
    </Container>
  );
};

export default PhoneInput;
