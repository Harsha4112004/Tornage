import User from "@/models/users.models";

export async function getJobPostingSubscribers() {
  const users = await User.find(
    {
      purchasedToolkits: { $in: ["Student Toolkit"] },
    },
    { email: 1, _id: 0 }
  ).lean();

  return users.map(user => user.email);
}
