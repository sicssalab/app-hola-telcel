import { Dimensions } from 'react-native';
import { Container, Tabs, Tab, Indicator } from './styles';

const NAVBAR_HEIGHT = 68;
const screenWidth = Dimensions.get('window').width;
const INDICATOR_WIDTH = 40;

export const useNavbarStyle = () => {
    return {
        height: NAVBAR_HEIGHT,
    };
};
const NavbarTabHeader = (props) => {
    const { state,
        descriptors,
        navigation,
        position } = props;

    const style = useNavbarStyle();

    // Translate the indicator to the middle of the tab
    const tabWidth = screenWidth / state.routes.length;
    const initialPosition = tabWidth / 2 - INDICATOR_WIDTH / 2;
    const translate = position.interpolate({
        inputRange: [0, state.routes.length],
        outputRange: [
            initialPosition,
            tabWidth * state.routes.length + initialPosition,
        ],
    });

    return (
        <Container style={[style]}>
            <Tabs>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    //const TabIcon = options.tabBarIcon as unknown as React.FC<Parameters<typeof options.tabBarIcon>[0]>;
                    const TabIcon = options.tabBarIcon;// as unknown as React.FC<Parameters<typeof options.tabBarIcon>[0]>;

                    return (
                        <Tab
                            key={route.name}
                            accessibilityState={{ selected: isFocused }}
                            onPress={onPress}>
                            <TabIcon
                                focused={isFocused}
                                color={options.tabBarInactiveTintColor}
                            />
                        </Tab>
                    );
                })}
            </Tabs>
            <Indicator
                style={{
                    width: INDICATOR_WIDTH,
                    transform: [{ translateY: -5 }, { translateX: translate }],
                }}
            />
        </Container>
    );
}

export default NavbarTabHeader;