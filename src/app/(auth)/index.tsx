import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { login } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={{ width: "75%", alignItems: "center", gap: Spacing.three }}>
                    <ThemedText type="subtitle">
                        Login
                    </ThemedText>
                    <TextInput 
                        onChangeText={setEmail} 
                        value={email} 
                        style={{ 
                            backgroundColor: colors.backgroundElement, 
                            borderRadius: 10.0, 
                            width: "100%", 
                            padding: Spacing.two,
                            color: colors.text
                        }} 
                        placeholder="Email" 
                        textContentType="emailAddress" 
                        keyboardType="email-address" 
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    <TextInput 
                        onChangeText={setPassword} 
                        value={password} 
                        style={{ 
                            backgroundColor: colors.backgroundElement, 
                            borderRadius: 10.0, 
                            width: "100%", 
                            padding: Spacing.two,
                            color: colors.text
                            
                        }} 
                        placeholder="Password" 
                        textContentType="password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    <Pressable 
                        style={({ pressed }) => [{
                            backgroundColor: pressed ? colors.textSecondary : colors.text,
                            transform: [{scale: pressed ? 0.95 : 1.0}],
                            width: "100%",
                            alignItems: "center",
                            padding: Spacing.two,
                            borderRadius: 10.0,
                            transitionDuration: "125ms"
                        }]}

                        onPressOut={()=>{
                            login(email, password)
                                .then(()=>{
                                    router.push("/(home)")
                                })
                        }}
                    >
                        <ThemedText type="default" style={{ color: colors.background }}>
                            Login
                        </ThemedText>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: "center",
    
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});