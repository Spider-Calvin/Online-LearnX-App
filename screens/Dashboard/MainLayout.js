import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import {
    Home,
    Profile,
    Search
} from '../../screens';
import { Shadow } from "react-native-shadow-2";
import { COLORS, SIZES, FONTS, constants } from '../../constants';

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
    ...bottom_tab,
    ref: React.createRef()
}))

const MainLayout = ({ appTheme }) => {

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    // const onBottomTabPress = React.useCallback(bottomTabIndex => {
    //     flatListRef?.current?.scrollToOffset({
    //         offset: bottomTabIndex * SIZES.width
    //     })
    // }) 

    function renderContent() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    // scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `Main-${item.id}`}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: scrollX } } }
                        ], {
                            useNativeDriver: false
                        })
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width
                                }}
                            >
                                {item.label == constants.screens.home && <Home />}
                                {item.label == constants.screens.search && <Search />}
                                {item.label == constants.screens.profile && <Profile />}

                            </View>
                        )
                    }}
                />

            </View>
        )
    }

    function renderBottomTab() {
        return (
            <View
                style={{
                    paddingBottom: SIZES.height > 800 ? 20 : 5,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.radius,
                    backgroundColor: appTheme?.backgroundColor1
                }}
            >
                <Shadow
                    style={{
                        height: 85,
                        width: SIZES.width - (SIZES.padding * 2)
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: appTheme?.backgroundColor2
                        }}
                    >
                        <Tabs
                            scrollX={scrollX}
                            onBottomTabPress={onBottomTabPress}
                        />
                    </View>
                </Shadow>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Content */}
            {renderContent()}

            {/* Bottom Tab */}
            {/* {renderBottomTab()} */}
        </View>
    )

}

export default MainLayout;