import React from 'react';
import { Text } from '../../../../components';
import { Title, Container } from './styles';

export const Header = () => {
  return (
    <Container>
      <Title>
        <Text fontSize='h3' fontWeight='bold'>Plazas comerciales</Text>
      </Title>
    </Container>
  );
};
