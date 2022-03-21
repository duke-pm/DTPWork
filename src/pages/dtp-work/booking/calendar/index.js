import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import viLocale from '@fullcalendar/core/locales/vi';
import enLocale from '@fullcalendar/core/locales/en-gb';
import {t} from "i18next";
import {
  Badge,
  Popover,
  PopoverHeader,
  PopoverBody,
  ModalHeader,
  Modal,
  ModalBody,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  Icon,
  Button,
  Row,
  Col,
  UserAvatar,
} from "../../../../components/Component";
/** COMMON */
import {findUpper} from "../../../../utils/Utils";

const EventView = (event) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { title, extendedProps, publicId } = event.event.event._def;
  return (
    <React.Fragment>
      <div id={publicId} onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
        {title}
      </div>{" "}
      <Popover placement="bottom" isOpen={mouseEnter} target={publicId}>
        <PopoverHeader>{title}</PopoverHeader>
        <PopoverBody>
          <div>
            <li>
              <span className="fw-bold">{t("all_booking:resource")}:</span> <Badge style={{backgroundColor: extendedProps.res.color}}
                className="badge badge-dim badge-pill">{extendedProps.res.name}</Badge>
            </li>
            <li>
              <span className="fw-bold">{t("all_booking:created_user")}:</span> {extendedProps.owner}
            </li>
            <li>
              <span className="fw-bold">{t("all_booking:notes")}:</span> {extendedProps.description}
            </li>
          </div>
        </PopoverBody>
      </Popover>
    </React.Fragment>
  );
};
const arrLocale = {
  viLocale,
  enLocale,
};
const month = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function CalendarBooking(props) {
  const {t} = useTranslation();
  const {
    language,
    isWrite,
    disabled,
    dataBookings,
    onChangeCalendar,
    onUpdate,
    onRemove,
  } = props;

  /** Use redux */
  const bookingState = useSelector(({booking}) => booking);

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState({
    info: false,
  });
  const [data, setData] = useState({
    list: [],
  });
  const [updateItem, setUpdateItem] = useState(null);

  const handleEventClick = info => {
    const bk = data.list.find((item) => item.id === info.event._def.publicId);
    setUpdateItem(bk);
    toggleView("info");
  };

  const toggleView = type => {
    setView({
      info: type === "info" ? true : false,
    });
  };

  const onPrepareData = () => {
    let tmpEves = [],
      strStatus = "",
      arrbooking = dataBookings,
      i = null;
    for (i of arrbooking) {
      strStatus = i.statusID === 1
        ? "warning"
        : i.statusID === 2
          ? "success"
          : "secondary";
      let eve = {
        id: "event-id-" + i.bookID,
        bookID: i.bookID,
        className: "fc-event-" + strStatus,
        type: {value: "fc-event-" + strStatus, label: i.purpose},
        title: i.purpose,
        allDay: false,
        start: i.startDate.replace("00:00:00", i.strStartTime + ":00"),
        end: i.endDate.replace("00:00:00", i.strEndTime + ":00"),
        description: i.remarks,
        owner: i.ownerName,
        res: {
          color: i.color,
          name: i.resourceName
        },
        users: i.lstUserJoined,
        originData: i,
      }
      tmpEves.push(eve);
    }
    setData({list: tmpEves});
    setLoading(false);
  };

  const returnDate = (date) => {
    if (date !== undefined) {
      let dateSection = date.split("T");
      let da = dateSection[0].split("-");
      let ti = dateSection[1];
      let newDate = da[2] + " " + t(`common:${month[Number(da[1]) - 1]}`) + " " +
        da[0] + " - " + moment(ti, "HH:mm:ss").format("h:mm A");
      return newDate;
    }
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      onPrepareData(dataBookings);
    }
  }, [loading, dataBookings]);

  useEffect(() => {
    if (!bookingState["submittingCreateBooking"]) {
      if (bookingState["successCreateBooking"] && !bookingState["errorCreateBooking"]) {
        return onPrepareData();
      }
    }
  }, [
    bookingState["submittingCreateBooking"],
    bookingState["successCreateBooking"],
    bookingState["errorCreateBooking"],
  ]);

  useEffect(() => {
    if (!bookingState["submittingUpdateBooking"]) {
      if (bookingState["successUpdateBooking"] && !bookingState["errorUpdateBooking"]) {
        return onPrepareData();
      }
    }
  }, [
    bookingState["submittingUpdateBooking"],
    bookingState["successUpdateBooking"],
    bookingState["errorUpdateBooking"],
  ]);

  /**
   ** RENDER
   */
  return (
    <React.Fragment>
      <FullCalendar
        initialView="dayGridMonth"
        themeSystem="bootstrap"
        headerToolbar={{
          left: "title prev,next",
          center: "",
          right: "today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
        locale={arrLocale[language + "Locale"]}
        events={data.list}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          meridiem: false,
        }}
        showNonCurrentDates={false}
        height={800}
        contentHeight={780}
        aspectRatio={3}
        editable={isWrite || !disabled}
        dayMaxEventRows={5}
        eventContent={(e) => <EventView event={e} />}
        eventClick={!(isWrite || !disabled) ? undefined : handleEventClick}
        datesSet={!(isWrite || !disabled) ? undefined : onChangeCalendar}
      />

      <Modal isOpen={view.info} toggle={toggleView} className="modal-md">
        <ModalHeader className={updateItem && updateItem.className} toggle={toggleView}>
          {updateItem && updateItem.title}
        </ModalHeader>
        <ModalBody>
          <Row className="gy-3 py-1">
            <Col sm="6">
              <h6 className="overline-title">{t("all_booking:created_user")}</h6>
              <p id="preview-event-end">{updateItem && updateItem.owner}</p>
            </Col>
            <Col sm="6">
              <h6 className="overline-title">{t("all_booking:resource_use")}</h6>
              <Badge
                style={{backgroundColor: updateItem && updateItem.res.color}}
                className="badge badge-dim badge-pill"
              >
                {updateItem && updateItem.res.name}
              </Badge>
            </Col>
            <Col sm="6">
              <h6 className="overline-title">{t("all_booking:start_time")}</h6>
              <p id="preview-event-start">{updateItem && returnDate(updateItem.start)}</p>
            </Col>
            <Col sm="6" id="preview-event-end-check">
              <h6 className="overline-title">{t("all_booking:end_time")}</h6>
              <p id="preview-event-end">{updateItem && returnDate(updateItem.end)}</p>
            </Col>
            {updateItem && updateItem.users.length > 0 && (
              <Col sm="12" id="preview-event-end-check">
                <h6 className="overline-title">{t("all_booking:employee_join")}</h6>
                <ul className="fav-list">
                  {updateItem.users.map((itemU, indexU) => {
                    return (
                      <li key={itemU.userID + "_user_" + indexU}>
                        <UserAvatar text={findUpper(itemU.fullName)} />
                      </li>
                    )
                  })}
                </ul>
              </Col>
            )}
            <Col sm="12" id="preview-event-description-check">
              <h6 className="overline-title">{t("all_booking:notes")}</h6>
              <p id="preview-event-description">{updateItem && (updateItem.description || "-")}</p>
            </Col>
          </Row>
          <ul className="d-flex justify-content-between gx-4 mt-3">
            <li>
              <Button
                color="primary"
                onClick={() => {
                  toggleView();
                  onUpdate(updateItem.originData);
                }}
              >
                <Icon name="edit" />
                <span>{t("common:update")}</span>
              </Button>
            </li>
            <li>
              <Button
                color="danger"
                className="btn-dim"
                onClick={() => {
                  toggleView();
                  onRemove(updateItem);
                }}
              >
                <Icon name="trash" />
                <span>{t("common:remove")}</span>
              </Button>
            </li>
          </ul>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CalendarBooking;
