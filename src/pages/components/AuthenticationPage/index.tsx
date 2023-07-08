import { useState } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  SimpleGrid,
  Anchor,
  Stack,
  createStyles,
} from "@mantine/core";
import axios from "../../../axios";
import { LoginCredentials } from "@/types";
import { LOGIN_FORM, REGISTRATION_FORM } from "@/constants";
import { useStateValue } from "@/store/StateProvider";
import { setUser } from "@/actions";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formWrapper: { maxWidth: "50%" },
}));

export default function AuthenticationForm(props: PaperProps) {
  const { classes } = useStyles();
  const [, dispatch] = useStateValue();
  const [formType, toggleForms] = useToggle([LOGIN_FORM, REGISTRATION_FORM]);
  const { getInputProps, onSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
      ...(formType === REGISTRATION_FORM && { firstName: "", lastName: "" }),
    },

    validate: {
      email: isEmail("Invalid email"),
      password: (val: any) =>
        val?.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      ...(formType === REGISTRATION_FORM && {
        firstName: isNotEmpty("Please enter first name"),
        lastName: isNotEmpty("Please enter last name"),
      }),
    },
  });

  const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const switchBetweenForms = (message?: string) => {
    toggleForms();
    setFeedbackMessage(message);
    setErrorMessage("");
  };

  const handleRegistration = (values: LoginCredentials) => {
    axios
      .post(`user/register`, values)
      .then(({ data }) => {
        switchBetweenForms(data);
      })
      .catch(({ response }) => setErrorMessage(response.data));
  };

  const handleLogin = (values: LoginCredentials) => {
    axios
      .post(`user/login`, values)
      .then(({ data }) => {
        const { data: userInfo, token } = data;
        dispatch(setUser({ ...userInfo, token }));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      })
      .catch(({ response }) => setErrorMessage(response.data));
  };

  return (
    <div className={classes.root}>
      <Paper
        radius="md"
        p="xl"
        withBorder
        {...props}
        className={classes.formWrapper}
      >
        <Text size="lg" weight={500}>
          Welcome to Femto, {formType} with
        </Text>

        <form
          onSubmit={onSubmit(
            formType === REGISTRATION_FORM ? handleRegistration : handleLogin
          )}
        >
          <Stack>
            {formType === REGISTRATION_FORM && (
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput
                  label="First Name"
                  placeholder="Enter Your first name"
                  radius="md"
                  name="firstName"
                  {...getInputProps("firstName")}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Your last name"
                  radius="md"
                  name="lastName"
                  {...getInputProps("lastName")}
                />
              </SimpleGrid>
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              radius="md"
              name="email"
              {...getInputProps("email")}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
              name="password"
              {...getInputProps("password")}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => switchBetweenForms()}
              size="xs"
            >
              {formType === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            {(feedbackMessage || errorMessage) && (
              <Text
                color={feedbackMessage ? "green" : "red"}
                size="sm"
                weight={500}
              >
                {feedbackMessage || errorMessage}
              </Text>
            )}
            <Button type="submit" radius="xl">
              {upperFirst(formType)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
