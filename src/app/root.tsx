import { useAuth } from "@/lib/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Root() {
    const { session, loading } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        // 1. SHIELD: Stop everything if Supabase is still connecting
        if (loading) return; 
        
        // 2. FIXED STRINGS: Match your literal folder names ("home", "auth")
        const inHome = segments[0] === "(home)";
        const inAuth = segments[0] === "(auth)";

        // 3. SECURE REDIRECT LOGIC
        if (session && !inHome) {
            // User is logged in but NOT in the home folder -> send them to home
            router.push("/(home)"); 
        } else if (!session && !inAuth) {
            // User is logged out but NOT in the auth folder -> send them to auth
            router.push("/(auth)");
        }
    }, [session, loading, segments]);

    // 4. FIX CONFLICT: Safe loading UI rendered AFTER hooks are registered
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(home)" />
        </Stack>
    );
}
