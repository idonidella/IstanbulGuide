import { action, observable, makeObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class authStore {
  @observable auth = {
    notifyId: '',
    isAuth: false,
    state: 1,
    data: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      familyname: '',
      token: '',
      packageId: '',
      familyRole: '',
      remainingMinutes: '',

    },
  };

  @observable version = '1.0.0';
  @observable activePassword = 1;
  @observable profilePhoto = '';
  @observable authCode = '';
  @observable googleId = '';

  constructor() {
    makeObservable(this);
    this.loadActivePassword();
    this.loadAuthData();
  }

  @action setAfterPayAction(val, callback) {
    this.auth.data.familyname = val.familyname;
    this.auth.data.packageId = val.packageId;
    this.auth.data.familyRole = val.familyRole;
    this.auth.data.remainingMinutes = val.remainingMinutes;
    AsyncStorage.setItem('authData', JSON.stringify(this.auth.data)).then(() => {
      callback();
    });
  }

  @action setFamilyName(val, callback) {
    this.auth.data.familyname = val.familyname;
    AsyncStorage.setItem('authData', JSON.stringify(this.auth.data)).then(() => {
      callback();
    });
  }

  @action async loadAuthData() {
    try {
      const value = await AsyncStorage.getItem('authData');
      if (value) {
        runInAction(() => {
          const data = JSON.parse(value);
          this.auth.isAuth = true;
          this.auth.data = data;
          this.profilePhoto = data.profile;
        });
      }
    } catch (error) {
      console.error('Error loading authData:', error);
    }
  }

  @action setAccessToken(newToken, callback) {
    this.auth.data.token = newToken;
    AsyncStorage.setItem('authData', JSON.stringify(this.auth.data)).then(
      () => {
        callback();
      },
    );
  }

  @action async signIn(data, callback) {
    await AsyncStorage.setItem('authData', JSON.stringify(data));
    runInAction(() => {
      this.auth.isAuth = true;
      this.auth.data = data;
      this.profilePhoto = data.profile;
      callback();
    });
  }

  @action async loadActivePassword() {
    try {
      const value = await AsyncStorage.getItem('activePassword');
      if (value !== null) {
        runInAction(() => {
          this.activePassword = parseInt(value);
        });
      }
    } catch (error) {
      console.error('Error loading activePassword:', error);
    }
  }

  @action setActivePassword(value) {
    this.activePassword = value;
    AsyncStorage.setItem('activePassword', value.toString());
  }

  @action async deleteAccount() {
    await AsyncStorage.setItem('authData', '');
    runInAction(() => {
      this.auth.isAuth = false;
      this.auth.data = {
        firstname: '',
        lastname: '',
        email: '',
        profile: '',
        token: '',
      };
      this.profilePhoto = '';
      this.setActivePassword(1);
    });
  }

  @action setAuthCode(val) {
    this.authCode = val;
  }

  @action setGoogleId(val) {
    this.googleId = val;
  }

  @action activePremium(packetId, callback) {
    this.auth.data.packetId = packetId;
    AsyncStorage.setItem('authData', JSON.stringify(this.auth.data)).then(
      () => {
        callback();
      },
    );
  }

  @action async signOut() {
    await AsyncStorage.setItem('authData', '');
    runInAction(() => {
      this.auth.isAuth = false;
      this.auth.data = {
        firstname: '',
        lastname: '',
        email: '',
        profile: '',
        token: '',
      };
      this.profilePhoto = '';
      this.setActivePassword(1);
    });
  }

  @action setProfile(val, callback) {
    this.auth.data.firstname = val.firstname;
    this.auth.data.lastname = val.lastname;
    AsyncStorage.setItem('authData', JSON.stringify(this.auth.data)).then(() => {
      callback();
    });
  }
}

export default new authStore();
