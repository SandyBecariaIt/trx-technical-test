
const InputComponent = ({
  value = '',
  placeholder = '',
  hdlOnChange = () => {},

}) => {

  const onChangeValue = (value) => {
    hdlOnChange(value);
  }
  return (
    <input
      value={value}
      onChange={(e) => onChangeValue(e)}
      class="input is-small"
      type="text"
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
