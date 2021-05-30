 import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'

const Login = () => {
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === ''


    useEffect(() => {
        document.title = "Login - Instagram"
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            setEmailAddress('')
            setPassword('')
            setError(error.message)
        }
    }
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="Instagram with profile" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 rounded border border-gray-primary mb-4">
                    <h1 className="flex justify-center w-full">
                        <img className="h-10 my-2" src="/images/logo.png" alt="Instagram logo" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">
                        <input
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />
                        <input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && `opacity-50`}`}>
                            Log In
                </button>


                    </form>
                </div>
                <div className="flex justify-center flex-col items-center w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">Don't have an account?{` `}
                    <Link to={ROUTES.SIGNUP} className="font-bold text-blue-medium">Sign up</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Login

// text-red-primary
//  text-gray-base
// border-gray-primary
// bg-blue-medium
// text-blue-medium