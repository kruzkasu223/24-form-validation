import { useMemo, useState } from "react"

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const isFormValid = useMemo(() => {
    return (
      emailError === "" &&
      passwordError === "" &&
      email !== "" &&
      password !== ""
    )
  }, [emailError, passwordError, email, password])

  const validateEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(email)) {
      setEmailError("")
    } else {
      setEmailError("Please enter a valid email address")
    }
  }

  const validatePassword = (password: string) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
    if (passwordRegex.test(password)) {
      setPasswordError("")
    } else {
      setPasswordError(
        "Password should be minimum eight characters, \nat least one uppercase letter, \none lowercase letter, \none number and one special character (@$!%*?&#^)"
      )
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const handleSubmit = () => {
    setEmail("")
    setPassword("")
    setEmailError("")
    setPasswordError("")
    setIsFormSubmitted(true)
  }

  const handleOkay = () => {
    setIsFormSubmitted(false)
  }

  return (
    <div
      data-theme="luxury"
      className="flex min-h-screen flex-col items-center gap-4"
    >
      <h1 className="m-6 text-4xl font-extrabold tracking-tight">
        24/27 - Form Validation
      </h1>
      <div className="mt-8">
        <div className="flex flex-col gap-8">
          {isFormSubmitted && (
            <div className="alert alert-info shadow-lg rounded-lg mb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Form has been submitted!</span>
              </div>
              <div className="flex-none">
                <button
                  onClick={handleOkay}
                  className="btn btn-secondary btn-sm"
                >
                  Okay
                </button>
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="input-group input-group-vertical">
              <span>Email</span>
              <input
                type="text"
                value={email}
                inputMode="email"
                placeholder="mail@site.com"
                onChange={handleEmailChange}
                className="input input-bordered input-accent"
              />
            </label>
            <label className="label">
              <span className="label-text-alt text-error">{emailError}</span>
              <span className="label-text-alt text-success">
                {!emailError && email && "All Good!"}
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="input-group input-group-vertical">
              <span>Password</span>
              <input
                type="password"
                value={password}
                placeholder="********"
                onChange={handlePasswordChange}
                className="input input-bordered input-accent"
              />
            </label>
            <label className="label">
              <span className="label-text-alt text-error whitespace-pre">
                {passwordError}
              </span>
              <span className="label-text-alt text-success">
                {!passwordError && password && "All Good!"}
              </span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="btn btn-accent"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
