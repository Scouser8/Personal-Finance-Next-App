import { useState } from "react";
import { createStyles, Table, ScrollArea, rem } from "@mantine/core";

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

const data = [
  {
    id: 1,
    totalAmount: 25000,
    dateToReachGoal: "01/12/2023",
    monthlyAmount: 5000,
  },
];

const columns = ["Total Saving Amount", "End date", "Monthly amount"];

function SavingsList() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.totalAmount}</td>
      <td>{row.dateToReachGoal}</td>
      <td>{row.monthlyAmount}</td>
    </tr>
  ));

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
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
