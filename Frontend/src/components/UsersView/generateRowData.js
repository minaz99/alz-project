export function generateRowData(users, start, count) {
  let newUsers = [];
  for (let i = start; i < count; i++) {
    newUsers.push(users[i]);
  }
  return newUsers;
}
