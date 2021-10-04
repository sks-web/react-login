import styles from "./input.module.css";

export default function Input(props) {
  return (
    <input
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      autoComplete="new-off"
    />
  );
}
