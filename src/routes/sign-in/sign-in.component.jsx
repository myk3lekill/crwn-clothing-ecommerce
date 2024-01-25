import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    useEffect(() => {
        async function fetchData() {
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
                return userDocRef
            }}
        fetchData()
    }, [])

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup(); 
        const userDocRef = await createUserDocumentFromAuth(response.user)
        return userDocRef
    }

    return (
        <div>
            <h1>I am the Sign in Page!</h1>
            <button onClick={logGoogleUser}> Sign In With Popup</button>
            <button onClick={signInWithGoogleRedirect}> Sign In With Redirect</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn