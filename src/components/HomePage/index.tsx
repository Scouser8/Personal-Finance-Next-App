import NewSavingForm from "./NewSavingForm";
import SavingsList from "./SavingsList";
import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: { padding: rem(16) },
}));

export default function ContainedInputs() {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.root}>
      <SavingsList />
      <NewSavingForm />
    </div>
  );
}
