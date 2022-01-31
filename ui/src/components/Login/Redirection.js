import React, { useEffect } from 'react';
import { handleAuthRedirect } from 'realm-web';

function Redirection() {
  useEffect(() => {
    handleAuthRedirect();
  }, []);

  return <h1 className="redirection">Signing in... Please Wait</h1>;
}

export default Redirection;
