import { useEffect, useState } from "react";
import { createStyles, Table, ScrollArea, rem } from "@mantine/core";
import { useStateValue } from "@/store/StateProvider";
import { updateSavingGoalsList } from "@/actions";
import { SavingGoal } from "@/types";
import dayjs from "dayjs";
import axios from "../../../axios";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const columns = [
  "Total Saving Amount",
  "Creation date",
  "End date",
  "Monthly amount",
  "Status",
];

function SavingsList() {
  const { classes, cx } = useStyles();
  const [{ user, savingGoals }, dispatch] = useStateValue();
  const [scrolled, setScrolled] = useState(false);

  const rows = savingGoals?.map((savingGoal: SavingGoal) => (
    <tr key={savingGoal._id}>
      <td>{savingGoal.totalSavingAmount}</td>
      <td>{dayjs(savingGoal.createdAt).format("DD/MM/YYYY")}</td>
      <td>{dayjs(savingGoal.dateToReachGoal).format("DD/MM/YYYY")}</td>
      <td>{savingGoal.monthlyAmount}</td>
      <td>
        {dayjs().isBefore(dayjs(savingGoal.dateToReachGoal))
          ? "In Progress"
          : "Done"}
      </td>
    </tr>
  ));

  useEffect(() => {
    axios("savings", { params: { userId: user._id } }).then((data) => {
      const { data: newSavingsList } = data;
      dispatch(updateSavingGoalsList(newSavingsList));
    });
  }, [dispatch, user._id]);

  return (
    <ScrollArea
      h={240}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            {columns.map((columnName) => (
              <th>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default SavingsList;
