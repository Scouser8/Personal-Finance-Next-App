import Home from "../components/HomePage";
import UserAuthentication from "../components/AuthenticationPage";
import { useStateValue } from "@/store/StateProvider";

export default function Page() {
  const [{ user }] = useStateValue();
  return !user ? <UserAuthentication /> : <Home />;
}
