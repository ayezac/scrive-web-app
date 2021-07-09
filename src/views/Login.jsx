import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";

import { AuthContext } from "../AuthProvider";
import { post, cookieAuthKey } from "../utils/api";
import { Box, Page, Input, Button } from "../components/UI";
import InputError from "../components/InputError";
import Error from "../components/Error";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const login = async ({ payload }) => {
    try {
      const response = await post({ payload });
      const cookie = `oauth_consumer_key="${
        response.data.apitoken
      }",oauth_token="${response.data.accesstoken}",oauth_signature="${
        response.data.apisecret + "%26" + response.data.accesssecret
      }"
   `;
      setAuthState({
        ...authState,
        isAuthenticated: true,
      });
      Cookies.set(cookieAuthKey, cookie);
    } catch (err) {
      setAuthState({
        isAuthenticated: false,
        authenticationFailed: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      try {
        login({ payload });
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (authState.isAuthenticated) {
    return <Redirect to={"/app"} />;
  }

  return (
    <Page
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      backgroundColor="grayLight"
    >
      {authState.authenticationFailed && (
        <Error
          error="Oops something went wrong. Check that your email and password are
        correct and try again"
        />
      )}
      <Box width="450px" height="auto" borderRadius="5">
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              borderColor={
                formik.touched.email && formik.errors.email && "warning"
              }
            />
            {formik.touched.email && formik.errors.email && (
              <InputError error={formik.touched.email && formik.errors.email} />
            )}
          </Box>
          <Box>
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              borderColor={
                formik.touched.password && formik.errors.password && "warning"
              }
            />
            {formik.touched.password && formik.errors.password && (
              <InputError
                error={formik.touched.password && formik.errors.password}
              />
            )}
          </Box>
          <Box pt="0">
            <Button type="submit" hoverColor="secondary">
              LOGIN
            </Button>
          </Box>
        </form>
      </Box>
    </Page>
  );
};

export default Login;
