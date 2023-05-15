import React, { useCallback, useState } from 'react';
import { Container, TextInput, IconContainer, LockIcon, Separator } from './styles';

// interface PasswordInputProps extends TextInputProps {
//   onPasswordChange: (password: string) => void;
// }

const PasswordInput = ({ onPasswordChange, ...props }) => {
  const [password, setPassword] = useState('');

  const formatPassword = useCallback((pwd) => {
    setPassword(pwd);
    onPasswordChange(pwd);
  }, [onPasswordChange]);

  return (
    <Container>
      <IconContainer>
        <LockIcon />
      </IconContainer>
      <Separator />
      <TextInput
        name='password'
        placeholder='Introduce tu contraseña'
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='newPassword'
        secureTextEntry
        value={password}
        enablesReturnKeyAutomatically
        onChangeText={formatPassword}
        {...props}
      />
    </Container>
  );
};

export default PasswordInput;
