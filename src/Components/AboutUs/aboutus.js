export default function AboutUs(props) {
  const btnClickEvent = function () {
    console.log("Hi");
  };

  return <button onClick={btnClickEvent}>Click Me</button>;
}
