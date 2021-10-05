import { useHistory } from "react-router-dom";
export default function AboutUs(props) {
  const history = useHistory();
  const btnClickEvent = function () {
    history.push("/contact");
  };
  return <button onClick={btnClickEvent}>Click Me</button>;
}
