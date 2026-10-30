import { AuthProvider } from "@/lib/AuthProvider";
import Root from "./root";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    )
} 