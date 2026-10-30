import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Protected guard={false}>
                <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Protected guard={true}>
                <Stack.Screen name="auth" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    )
}