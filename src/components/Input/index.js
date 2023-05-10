import React from 'react';
import { TextInputProps, View } from 'react-native';
import { CancelTouchArea, Content, TextInput } from './styles';
import Text from '../Text';
import { SvgUri } from 'react-native-svg';
import settings from '../../settings';
// interface SearchProps extends TextInputProps {
//   title: string;
// }

const Input = ({ title, ...props }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text fontWeight='bold' fontSize='large'>
        {title}
      </Text>
      <Content>
        <TextInput {...props} />
        {!!props.value && (
          <CancelTouchArea onPress={() => props.onChangeText('')}>
            <SvgUri width={18} height={18} fill={"black"}
                uri={`${settings.domainImage}images/Cancel.${settings.typeImage}`}
              />
          </CancelTouchArea>
        )}
      </Content>
    </View>
  );
};

export default Input;
