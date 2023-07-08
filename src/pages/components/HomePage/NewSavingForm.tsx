import React, { useEffect, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { createStyles, rem, Group, TextInput, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import axios from "../../../axios";
import { useStateValue } from "@/store/StateProvider";
import { updateSavingGoalsList } from "@/actions";
import { getRemainingPeriodInMonths } from "./utils";

const useStyles = createStyles((theme) => ({
  root: { marginTop: rem(16) },
  addButton: {
    width: 150,
  },
  fields: {
    "& > *": {
      width: 300,
    },
  },
}));

type SavingGoalValues = {
  totalSavingAmount: number;
  dateToReachGoal: Date;
};

function NewSavingForm() {
  const { classes } = useStyles();
  const [{ user }, dispatch] = useStateValue();
  const { values, getInputProps, onSubmit, reset } = useForm({
    initialValues: {
      totalSavingAmount: 0,
      dateToReachGoal: dayjs(new Date()).add(1, "month").toDate(),
    },
    validate: {
      totalSavingAmount: (value) =>
        value && value > 0 ? null : "Please enter an amount to save",
      dateToReachGoal: isNotEmpty("Name cannot be empty"),
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const periodRemainingInMonths = getRemainingPeriodInMonths(
    values.dateToReachGoal
  );

  const monthlyAmount =
    values?.totalSavingAmount /
    (periodRemainingInMonths > 0 ? periodRemainingInMonths : 1);

  const handleSubmit = (values: SavingGoalValues) => {
    setIsSubmitting(true);
    axios
      .post("savings/add", {
        params: { ...values, monthlyAmount, userId: user._id },
      })
      .then(() =>
        axios("savings", { params: { userId: user._id } })
          .then((data) => {
            const { data: newSavingsList } = data;
            dispatch(updateSavingGoalsList(newSavingsList));
          })
          .finally(() => {
            reset();
            setIsSubmitting(false);
          })
      );
  };

  return (
    <form className={classes.root} onSubmit={onSubmit(handleSubmit)}>
      <Group position="center" className={classes.fields}>
        <TextInput
          type="number"
          size="md"
          mt="md"
          label="Total Amount"
          name="totalSavingAmount"
          placeholder="Enter the total saving amount"
          {...getInputProps("totalSavingAmount")}
        />
        <DatePickerInput
          size="md"
          mt="md"
          popoverProps={{ withinPortal: true }}
          label="Date to reach goal"
          clearable={true}
          name="dateToReachGoal"
          placeholder="Pick an end date"
          minDate={new Date()}
          {...getInputProps("dateToReachGoal")}
        />
        <TextInput
          type="number"
          size="md"
          mt="md"
          label="Monthly amount"
          readOnly
          value={monthlyAmount}
        />
      </Group>

      <Group position="center" mt="xl">
        <Button type="submit" size="md" disabled={isSubmitting}>
          Add New Saving Goal
        </Button>
      </Group>
    </form>
  );
}

export default NewSavingForm;
