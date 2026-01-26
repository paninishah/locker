import calIcon from "/calicon.png";
import "./CalendarButton.css";

export default function CalendarButton() {
  return (
    <button className="calendar-btn">
      <img src={calIcon} alt="calendar" />
    </button>
  );
}

