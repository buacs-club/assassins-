import { Alert, Keyboard, Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/lib/AuthProvider';
import { logout, supabase } from '@/lib/supabase';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const { session } = useAuth()

  const [usernameModalVisible, setUserNameModalVisible] = useState(false);

  const [username, setUsername] = useState(session?.user.user_metadata.username)
  
  let syncedUsername = session?.user.user_metadata.username;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={{
            alignItems: "center", 
            justifyContent: "space-between", 
            flexDirection: 'row'
        }}>
          <ThemedText type="subtitle" style={{ color: colors.text }}>
            Hello, {syncedUsername?.split(" ")[0]} {syncedUsername?.split(" ")[1]?.split("")[0]}{syncedUsername?.split(" ").length > 1 ? "." : ""}
          </ThemedText>
          <Pressable 
            style={({ pressed }) => [{
                transform: [{scale: pressed ? 0.95 : 1.0}],
                alignItems: "center",
                padding: Spacing.two,
                borderRadius: Spacing.six,
                transitionDuration: "125ms",
            }]}

            onPressOut={()=>{
                setUserNameModalVisible(true)
            }}
          >
              <SymbolView
                name={{ ios: "pencil", android: 'edit' }}
                size={24}
                tintColor="white"
              />
          </Pressable>
        </View>
        <Modal 
          animationType='slide'
          transparent={true}
          visible={usernameModalVisible}
          onRequestClose={() => {setUserNameModalVisible(false)}}
        >
          <View style={styles.overlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setUserNameModalVisible(false)}
            />
            <View style={{
              minHeight: "75%",
              padding: Spacing.four,
              paddingBottom: 40,
              backgroundColor: colors.backgroundElement,
              borderTopLeftRadius: Spacing.four,
              borderTopRightRadius: Spacing.four,
              bottom: "0px",
              gap: Spacing.two,
              position: "relative"
            }}>
              <Pressable
                style={StyleSheet.absoluteFill}
                onPress={() => Keyboard.dismiss()}
              />
              <ThemedText type="default" style={{ color: colors.text }}>
                Change your username:
              </ThemedText>
              <TextInput 
                onChangeText={setUsername} 
                value={username} 
                style={{ 
                    backgroundColor: colors.backgroundElement, 
                    borderRadius: Spacing.six, 
                    width: "100%", 
                    padding: Spacing.three,
                    color: colors.text,
                    fontSize: 16,
                    borderColor: colors.textSecondary,
                    borderWidth: 1
                }} 
                placeholder="Username" 
                textContentType="name"
                autoCorrect={true}
              />  

              <View style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: Spacing.four,
                  paddingLeft: Spacing.four,
                  paddingRight: Spacing.four,
                  flex: 1,
                  alignItems: "center"
                }}>
                  <Pressable 
                  style={({ pressed }) => [{
                      backgroundColor: pressed ? colors.textSecondary : colors.text,
                      transform: [{scale: pressed ? 0.95 : 1.0}],
                      width: "100%",
                      alignItems: "center",
                      padding: Spacing.two,
                      borderRadius: Spacing.six,
                      transitionDuration: "125ms",
                  }]}

                  onPressOut={()=>{
                    console.log("UPDATING USER")
                    supabase.auth.updateUser({
                      data: {
                        username
                      }
                    })
                    setUserNameModalVisible(false)
                  }}
                >
                    <ThemedText type="default" style={{ color: colors.background }}>
                        Save
                    </ThemedText>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable 
          style={({ pressed }) => [{
              //backgroundColor: pressed ? colors.textSecondary : colors.text,
              transform: [{scale: pressed ? 0.95 : 1.0}],
              width: "100%",
              alignItems: "center",
              padding: Spacing.two,
              borderRadius: Spacing.six,
              transitionDuration: "125ms",
              borderColor: colors.accent,
              borderWidth: 1
          }]}

          onPressOut={()=>{
              Alert.alert(
                "Sign out?",
                "Idk does it sign you out?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Sign out",
                    style: "destructive",
                    onPress: () => {
                      logout()
                    }
                  }
                ]
              )
          }}
        >
            <ThemedText type="default" style={{ color: colors.accent }}>
                Sign out
            </ThemedText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    gap: Spacing.two,
    flexDirection: "column",
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
});
