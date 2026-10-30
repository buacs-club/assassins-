{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config = {
          allowUnfree = true;
          android_sdk.accept_license = true;
        };
      };

      android = pkgs.androidenv.composeAndroidPackages {
        platformVersions = [ "37" ];
        buildToolsVersions = [ "37.0.0" ];
        ndkVersions = [ "27.1.12297006" ];
        includeNDK = true;
        cmakeVersions = [ "3.22.1" ];
        includeCmake = true;
      };

      sdk = "${android.androidsdk}/libexec/android-sdk";
    in {
      devShells.${system}.default = pkgs.mkShell {
        packages = [
          pkgs.bun
          pkgs.nodejs_22
          pkgs.jdk17
          pkgs.android-tools
          android.androidsdk
        ];

        ANDROID_HOME = sdk;
        ANDROID_SDK_ROOT = sdk;
        ANDROID_NDK_ROOT = "${sdk}/ndk/27.1.12297006";
        GRADLE_OPTS =
          "-Dorg.gradle.project.android.aapt2FromMavenOverride=${sdk}/build-tools/37.0.0/aapt2";

        shellHook = ''
          export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
        '';
      };
    };
}