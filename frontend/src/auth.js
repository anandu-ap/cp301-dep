import {createAuthProvider} from 'react-token-auth'

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    accessTokenKey: "accessToken",
    onUpdateToken: (token) => fetch("http://127.0.0.1:5000/refresh", {
        method: 'POST',
        body: token.refresh_tocken
    })
    .then(r => r.json())
})