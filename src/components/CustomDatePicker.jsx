import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/DatePicker.css";
import { ko } from "date-fns/locale";

const CustomDatePicker = (props) => {
  return (
    <div>
      <DatePicker
        selected={props.selectedDate}
        onChange={props.setSelectedDate}
        showPopperArrow={false}
        shouldCloseOnSelect
        locale={ko}
        dateFormat="yyyy.MM.dd"
      />
    </div>
  );
};

export default CustomDatePicker;
