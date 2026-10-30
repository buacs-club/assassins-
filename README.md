# BUA Lock-in Assassins

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bunx expo start
   ```

## iOS Cloud Build
1. Build the app using eas
   ```bash
   bunx eas-cli@latest build --platform ios --profile unsigned
   ```

## Android Run
1. Nix Dev & Run
   ```bash
   nix develop
   bunx expo run:android
   ```