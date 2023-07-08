import React from "react";
import { useForm } from "@mantine/form";
import { createStyles, rem, Group, TextInput, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  root: { marginTop: rem(16) },

  input: {
    // height: rem(54),
    // paddingTop: rem(18),
  },

  label: {
    // position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    // paddingLeft: theme.spacing.sm,
    // paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  addButton: {
    width: 150,
  },
  fields: {
    "& > *": {
      width: 200,
    },
  },
}));

function NewSavingForm() {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <div className={classes.root}>
      <Group position="center" className={classes.fields}>
        <TextInput
          size="md"
          mt="md"
          label="Total Amount"
          name="email"
          {...form.getInputProps("email")}
        />
        <DatePickerInput
          size="md"
          mt="md"
          popoverProps={{ withinPortal: true }}
          label="Date to reach goal"
          clearable={true}
        />
      </Group>

      <Group position="center" mt="xl">
        <Button type="submit" size="md">
          Add New Goal
        </Button>
      </Group>
    </div>
  );
}

export default NewSavingForm;
