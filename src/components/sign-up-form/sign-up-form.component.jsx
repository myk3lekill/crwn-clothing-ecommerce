import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { useState } from "react"
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields

    //User Context setCurrentUser
    //const { setCurrentUser } = useContext(UserContext)

    //console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword) {
            alert('passwords do not mathc');
            return;
        } else {
            try {
                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                //setCurrentUser(user)
                await createUserDocumentFromAuth(user, { displayName } );
                resetFormFields();
            } catch (error) {
                if(error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use')
                } else {
                    console.log('user creation encounter an error', error)
                }
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields( {...formFields, [name]: value} )
    }

    return (
        <div className="sign-up-container">
            <h2>Don't Have an Account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit = { handleSubmit }>
                
                <FormInput label='displayName' type ='text' required onChange={handleChange} name='displayName' value={displayName} />

                <FormInput label='email' type ='email' required onChange={handleChange} name='email' value={email}/>

                <FormInput label='password' type= 'password' required onChange={handleChange} name='password' value={password}/>

                <FormInput label='confirmPassword' type = 'password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit" > Sign Up </ Button>
            </form>
        </div>
    )
}

export default SignUpForm