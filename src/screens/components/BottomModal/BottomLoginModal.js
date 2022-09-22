import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../main/ShopitStack/CheckoutScreens/BagScreen/styles";
import { useNavigation } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import * as GoogleSignIn from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AppleAuthentication from "expo-apple-authentication";
import { facebookLogin, googleLogin, appleLogin } from "../../../redux";
import { useDispatch } from "react-redux";
import Constants from "expo-constants";
import {
  APP_NAME,
  FACEBOOK_APP_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_EXPO_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "../../../res/env";
import { useSelector } from "react-redux";

const BottomLoginModal = ({ hideLoginModal }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [fbResponse, setFbResponse] = useState({});
  const [googleResponse, setGoogleResponse] = useState({});

  const { saving } = useSelector((state) => state.account);
  const AuthSaving = useSelector((state) => state.auth.saving);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  useEffect(() => {
    console.log(googleResponse);
    if (googleResponse?.type === "success") {
      dispatch(googleLogin(googleResponse.authentication.accessToken));
      console.log("acc", googleResponse.authentication.accessToken);
      setTimeout(() => {
        hideLoginModal();
      }, 1000);
    }

    if (fbResponse?.type === "success") {
      dispatch(facebookLogin(fbResponse.authentication.accessToken));
      setTimeout(() => {
        hideLoginModal();
      }, 2000);
    }
  }, [googleResponse, fbResponse]);

  const [_, ___, googlePromptAsync] = GoogleSignIn.useAuthRequest(
    {
      iosClientId:
        "575803309006-hqi5d55e9ge3vhund8kifreii46atgnc.apps.googleusercontent.com",
      androidClientId:
        "575803309006-h41b428ak4vr4q1v5akc7r4cshq9rqbr.apps.googleusercontent.com",
      expoClientId: GOOGLE_EXPO_ID,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const [__, ____, fbPromptAsync] = Facebook.useAuthRequest(
    {
      clientId: FACEBOOK_APP_ID,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const handleFacebookAuth = async () => {
    const response = await fbPromptAsync({ redirectUri });
    setFbResponse(response);
  };

  const handleGoogleAuth = async () => {
    const response = await googlePromptAsync({
      showInRecents: true,
      redirectUri,
    });
    setGoogleResponse(response);
  };

  const handleAppleLogin = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (identityToken) {
        dispatch(appleLogin(identityToken));
        setTimeout(() => {
          hideLoginModal();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (saving || AuthSaving) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.login_container}>
        <Text style={styles.main_text}>LOGG INN ELLER REGISTRER DEG</Text>
        <View style={styles.login_body}>
          {Platform.OS === "ios" && (
            <View style={styles.login_content}>
              <TouchableOpacity
                style={styles.login_btn}
                onPress={handleAppleLogin}
              >
                <Image
                  style={styles.login_image}
                  source={require("../../../../assets/images/Header-Icon/apple.png")}
                />

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.link_text}>LOGG INN MED APPLE</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.login_content}>
            <TouchableOpacity
              style={styles.login_btn}
              onPress={handleGoogleAuth}
            >
              <Image
                style={styles.login_image}
                source={require("../../../../assets/images/Header-Icon/google.png")}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.link_text}>LOGG INN MED GOOGLE</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.login_content}>
            <TouchableOpacity
              style={styles.login_btn}
              onPress={() => handleFacebookAuth()}
            >
              <Image
                style={styles.login_image}
                source={require("../../../../assets/images/Header-Icon/fb.png")}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.link_text}>LOGG INN MED FACEBOOK</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.login_content}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.bottom_text}>FORTSETT MED E-POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default BottomLoginModal;
