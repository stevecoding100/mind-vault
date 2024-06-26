const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "TEAM", uid: "team" },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];
const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];
const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        status: "Active",
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
        email: "samantha.brooks@example.com",
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "vacation",
        age: "33",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "frank.harrison@example.com",
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "emma.adams@example.com",
    },
];
export { columns, users, statusOptions };
