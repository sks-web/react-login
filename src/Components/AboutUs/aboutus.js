import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
export default function AboutUs(props) {
  const dispatch = useDispatch();
  const hisotry = useHistory();
  const btnClickEvent = function () {
    hisotry.push("/contact");
    dispatch({ type: "CHANGE_TAB", val: "/contact" });
  };

  return <button onClick={btnClickEvent}>Click Me</button>;
}
