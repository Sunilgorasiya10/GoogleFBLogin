import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, Image } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class FBLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            token: '',
            profile_pic: '',
        };
    }

    FBLogin = () => {
        var user = this;

        // if(Login)
        LoginManager.logOut();
        // LoginManager.getDefaultAudience(user)
        // console.log('Logout res :', res);
        // .then(res => console.log('Logout  res : ', res));
        Platform.OS = 'android' ? LoginManager.setLoginBehavior('web_only') : null;
        // LoginManager.setLoginBehavior('web_only');
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(async data => {
                        console.log(data);
                        const infoRequest = new GraphRequest(
                            '/me?fields=name,email,picture.type(large)',
                            null,
                            (error, result) => {
                                if (error) {
                                    console.log('Error fetching data: ', error);
                                } else {
                                    alert(JSON.stringify(result));
                                    console.log(
                                        'Success fetching data: ',
                                        JSON.stringify(result),
                                    );
                                    //   user = JSON.stringify(result);
                                    // this.setState({ user_name: 'ddddd' })
                                    user.setState({ user_name: 'Welcome' + ' ' + result.name });
                                    user.setState({ token: 'User Token: ' + ' ' + result.id });
                                    user.setState({ profile_pic: result.picture.data.url });
                                }
                            },
                        );

                        new GraphRequestManager().addRequest(infoRequest).start();

                        //second way
                        // await fetch(
                        //   'https://graph.facebook.com/v2.5/me?fields=id,first_name,last_name,email,picture.type(large)&access_token=' +
                        //     data.AccessToken,
                        // ).then(res => {
                        //   user = res.json();
                        //   console.log('user : ', user);
                        //   alert('Login Sucessfully');
                        // });
                    });
                }
            },
            function (error) {
                console.log('Login fail with error: ', error);
            },
        );

        // this.setState({user_name: 'Welcome' + ' ' + user.name});
        // this.setState({token: 'User Token: ' + ' ' + user.id});
        // this.setState({profile_pic: user.picture.data.url});
        console.log('this.state.user_name : ', this.state.user_name);
    }
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {this.state.profile_pic ? (
                    <Image
                        source={{ uri: this.state.profile_pic }}
                        style={{ width: 200, height: 200 }}
                    />
                ) : null}
                <Text> {this.state.user_name} </Text>
                <Text> {this.state.token} </Text>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 35, width: 70, backgroundColor: 'blue' }}
                    onPress={() => this.FBLogin()}>
                    <Text style={{ color: 'white' }}>FBLogin</Text>
                </TouchableOpacity>
            </View>
        );
    }
};