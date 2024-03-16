import { EmbyConfig, config } from '@api/config';
import { Api, Emby } from '@api/emby';
import { login } from '@api/login';
import { Navigation } from '@global';
import { Store } from '@helper/store';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

const style = StyleSheet.create({
    inputLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
    },
    inputLabel: {
        flexShrink: 0,
        minWidth: 50,
        fontWeight: "600",
        fontSize: 16,
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 2.5,
        padding: 2.5,
    },
    loginButton: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f194ff",
        borderRadius: 5,
        width: "75%"
    }
});

export function Page() {
    const navigation: Navigation = useNavigation()
    const [server, onChangeServer] = useState('');
    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const onLoginPress = async () => {
        const regex = /(?<protocol>http|https):\/\/(?<host>[^\/]+):?(?<port>\d+)?(?<path>\/?.*)/
        const groups = server.match(regex)?.groups
        const embyConfig: EmbyConfig = {
            host: groups?.host ?? "",
            port: groups?.port ? parseInt(groups.port) : 443,
            protocol: groups?.protocol ?? "https" as any,
            path: groups?.path ? (groups?.path.length === 0 ? "/" : groups?.path) : "/"
        }
        await Store.set("@server", JSON.stringify(embyConfig))
        config.emby = embyConfig
        const user = await login(username, password)
        await Store.set("@user", JSON.stringify(user))
        Api.emby = new Emby(user)
        navigation.navigate("home")
    }
    return (
        <SafeAreaView>
            <View style={style.inputLine}>
                <Text style={style.inputLabel}>服务器</Text>
                <TextInput
                    placeholder="https://server.emby.media"
                    style={style.input}
                    onChangeText={onChangeServer}
                    value={server}
                />
            </View>
            <View style={style.inputLine}>
                <Text style={style.inputLabel}>用户名</Text>
                <TextInput
                    placeholder="guest"
                    style={style.input}
                    onChangeText={onChangeUsername}
                    value={username}
                />
            </View>
            <View style={style.inputLine}>
                <Text style={style.inputLabel}>密码</Text>
                <TextInput
                    placeholder="password"
                    style={style.input}
                    onChangeText={onChangePassword}
                    value={password}
                    keyboardType="numeric"
                />
            </View>
            <View style={style.loginButton}>
                <Button title="登录" color="white" onPress={onLoginPress} />
            </View>
        </SafeAreaView>
    );
}