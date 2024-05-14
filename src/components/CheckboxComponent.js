
const CheckComponent = ({
  label,
  checked,
  hdlOnChange = () => {}
}) => {
  return (
    <>
      <label class="checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={hdlOnChange}
        />
        {label}
      </label>
    </>
  );
};

export default CheckComponent;
