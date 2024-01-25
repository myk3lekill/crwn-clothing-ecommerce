import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup(); 
        createUserDocumentFromAuth(response.user)
    }
    return (
        <div>
            <h1>I am the Sign in Page!</h1>
            <button onClick={logGoogleUser}> Sign In With Popup</button>
        </div>
    )
}

export default SignIn