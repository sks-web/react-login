import { useSelector } from "react-redux";
export default function Dashboard() {
  const data = useSelector((state) => state.auth.authUser);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome ! {data.fullName}</h2>
    </div>
  );
}
