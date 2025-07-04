import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const [timer, setTimer] = useState<number>(30);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("login Submited-", values, navigate);
      dispatch(signin({values,navigate}));
    },
  });

  const handleResendOTP = () => {
    // Implement OTP resend logic

    const formattedEmail = "signing_" + formik.values.email;

    console.log(formattedEmail);
    dispatch(sendLoginSignupOtp({ email: formattedEmail }));
    console.log("Resend OTP");
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };


  useEffect(() => {
        let interval: any

        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsTimerActive(false);
                        return 30; // Reset timer for next OTP request
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive]);


  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
      </h1>

      <div className="flex flex-col gap-5">
        <div>
          <TextField
            fullWidth
            name="email"
            label="Enter Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        {auth.otpSent && (
          <div>
            <label htmlFor="otp" className="block mb-1 text-sm text-gray-500">
              Enter Otp sent to your email
            </label>
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />

            <p className="text-xs space-x-2">
              {isTimerActive ? (
                <span>Resend OTP in {timer} seconds</span>
              ) : (
                <>
                  Didn’t receive OTP?{" "}
                  <span
                    onClick={handleResendOTP}
                    className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold"
                  >
                    Resend OTP
                  </span>
                </>
              )}
            </p>
            {formik.touched.otp && formik.errors.otp && (
              <p>{formik.errors.otp as string}</p>
            )}
          </div>
        )}

        <div>
          {auth.otpSent ? (
            <Button
              onClick={() => formik.handleSubmit()}
              variant="contained"
              fullWidth
              sx={{ py: "11px" }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleSendOtp}
              variant="contained"
              fullWidth
              sx={{ py: "11px", my: "10px" }}
            >
              {auth.loading ? <CircularProgress /> : "Sent Otp"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
