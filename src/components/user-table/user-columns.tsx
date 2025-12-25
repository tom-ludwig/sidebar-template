import type { User } from "@api/generated/users/models";

export const userColumns = [
  {
    id: "user_id",
    header: "User ID",
    accessor: (user: User) => user.user_id,
  },
  {
    id: "first_name",
    header: "First Name",
    accessor: (user: User) => user.first_name,
  },
  {
    id: "last_name",
    header: "Last Name",
    accessor: (user: User) => user.last_name,
  },
  {
    id: "email",
    header: "Email",
    accessor: (user: User) => user.email,
  },
];

