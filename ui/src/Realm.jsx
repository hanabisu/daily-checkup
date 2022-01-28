import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import * as Realm from 'realm-web';

const RealmAppContext = createContext({});

export const useRealmApp = () => {
  const app = useContext(RealmAppContext);
  if (!app) {
    throw new Error('You must call useRealmApp() inside of a <RealmAppProvider />');
  }
  return app;
};

export function RealmAppProvider({ appId, children }) {
  const [app, setApp] = useState(new Realm.App(appId));
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  const login = async (credentials) => {
    const user = await app.logIn(credentials);
    setCurrentUser(app.currentUser);
    return user;
  };
  const logout = async () => {
    await app.currentUser?.logOut();
    console.log(app.currentUser);
    setCurrentUser(app.currentUser);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const wrapped = {
    ...app, currentUser, login, logout,
  };
  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
}
