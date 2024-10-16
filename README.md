[Guide to backup and restore](https://github.com/lra/mackup/issues/1924#issuecomment-2032982796)

# Backing up old machine
Backup all the preferences
```
mackup backup --force
mackup uninstall --force
```
Create brew bundle and save it into the dotfile folder
```
brew bundle dump
mv Brewfile ~/.mackup/Brewfile
```

# Setting up new machine

### Preparing the dotfiles:
Create mackup config file:
```
nano ~/.mackup.cfg
```
Paste the following file content:
```
[storage]
engine = file_system
path = .mackupstore
```
Install brew:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval $(/opt/homebrew/bin/brew shellenv)' > ~/.zprofile
```
Create the folder .mackup and clone the dotfile repo into it:

```
mkdir .mackupstore
cd .mackupstore
git clone https://github.com/NatanCieplinski/dotfiles.git .
```

### Installing apps and preferences
>Important Update MacOS to latest version, or following installations might fail for some apps.


To install from the Brewfile:
```
brew bundle --file=~/.mackup/Brewfile
```
Clone all the preferences from mackup:
```
mackup restore
mackup uninstall --force
```

### App Maintenance
To update all apps installed with cask
```
brew cu
```
To uninstall cask app
```
brew cask zap <caskname>
```
