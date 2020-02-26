import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      firstTime: false,
    }
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '145673018369-vm9nfod6p9cftpkp50gc8kr7hg5r16ul.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  signIn = async () => {
    try {
      // if (GoogleSignin.getCurrentUser.valueOf(true)) {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      this.setState({ userInfo: userInfo.user });
      this.setState({ firstTime: true });
      // } else {
      //   alert('Plz log out first')
      // }

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  Logout = async () => {
    if ((await GoogleSignin.isSignedIn())) {
      GoogleSignin.signOut()
        .then(res => console.log(res))
        .catch(err => console.log('err', err))
      this.setState({ userInfo: {} })
      this.setState({ firstTime: false })
    } else {
      alert('Plz Log in First')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <GoogleSigninButton
          style={{ width: 185, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.signIn()}
        // disabled={this.state.isSigninInProgress} 
        />
        <TouchableOpacity
          style={{ minWidth: 150, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2AC062', display: 'flex', borderRadius: 5, shadowColor: '#2AC062', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { height: 10, width: 5 }, }}
          onPress={() => this.Logout()}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Log out</Text>
        </TouchableOpacity>

        <Text>{this.state.firstTime ? ('Welcome ' + this.state.userInfo.name) : null}</Text>
        <Image style={{ height: 100, width: 100 }}
          source={{ uri: this.state.userInfo.photo }}></Image>
      </View >
    )
  }
}