import {TabNavigation} from '@global';
import { useAppDispatch, useAppSelector } from '@hook/store';
import {useNavigation} from '@react-navigation/native';
import {getActiveMenu, switchToMenu} from '@store/menuSlice';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import { Image } from '@view/Image';
const homeIcon = require('@view/menu/Home.png');
const searchIcon = require('@view/menu/Search.png');
const starIcon = require('@view/menu/Star.png');
const settingsIcon = require('@view/menu/Setting.png');
const messageIcon = require('@view/settings/message.png');

export enum MenuType {
    Home = 'HomeTab',
    Search = 'SearchTab',
    Star = 'StarTab',
    Settings = 'SettingsTab',
    Message = 'MessageTab',
}

const style = StyleSheet.create({
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: 'gray',
        borderTopWidth: 0.25,
        paddingTop: 8,
        paddingBottom: 2.5,
        alignItems: 'center',
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: 'auto',
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    icon: {
        height: 25,
        aspectRatio: 1,
        // tintColor: "rgba(128, 128, 128, 0.3)",
        opacity: 0.25,
    },
    activeIcon: {
        height: 25,
        aspectRatio: 1,
        tintColor: undefined,
    },
});

const menu = [
    {icon: searchIcon, name: 'Search', type: MenuType.Search},
    {icon: starIcon, name: 'Star', type: MenuType.Star},
    {icon: homeIcon, name: 'Home', type: MenuType.Home},
    {icon: messageIcon, name: 'Message', type: MenuType.Message},
    {icon: settingsIcon, name: 'Settings', type: MenuType.Settings},
];

export function MenuBar() {
    const active = useAppSelector(getActiveMenu);
    const dispatch = useAppDispatch();
    const navigation: TabNavigation = useNavigation();
    const setActive = (menu: MenuType) => {
        dispatch(switchToMenu(menu));
        navigation.navigate(menu);
    };
    return (
        <View style={style.menuBar}>
            {menu.map((item, i) => (
                <TouchableOpacity activeOpacity={1.0}
                    key={i}
                    onPress={() => setActive(item.type)}>
                    <View style={style.menuItem}>
                        <Image
                            style={
                                active === item.type
                                    ? style.activeIcon
                                    : style.icon
                            }
                            source={item.icon}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
