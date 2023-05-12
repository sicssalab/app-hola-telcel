import {
    Text,
    View,
  } from 'react-native';

const NoFoundResult = (props) => {
  const { section, valueSearch } = props;
  if (section.data.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 20,
          backgroundColor: "#1e1e1e",
          flexDirection: "row",
          flexWrap: "nowrap",
        }}
      >
        <Text style={{ color: "white" }}>
          <Text>La búsqueda de</Text>
          <Text
            style={{ color: "white", fontWeight: "bold" }}
          >{` ${valueSearch} `}</Text>
          <Text style={{ color: "white" }}>no obtuvo ningún resultado.</Text>
        </Text>
      </View>
    );
  }
  return null;
};

export default NoFoundResult;
