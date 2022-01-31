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

  const loginToRealm = async (credentials) => {
    const user = await app.logIn(credentials);
    setCurrentUser(app.currentUser);
    return user;
  };
  const logoutOfRealm = async () => {
    await app.currentUser?.logOut();
    setCurrentUser(app.currentUser);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const wrapped = {
    ...app, currentUser, loginToRealm, logoutOfRealm,
  };
  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
}
