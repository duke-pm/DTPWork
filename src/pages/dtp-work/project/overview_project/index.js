import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Spinner,
} from "reactstrap";
import DatePicker from "react-datepicker";
/** COMPONENTS */
import Content from "layout/content/Content";
import Head from "layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  DataTable,
  PaginationComponent,
  PreviewAltCard,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
  BlockBetween,
  AlertConfirm,
} from "components/Component";
/** COMMON */
import {getLocalStorage, log, setLocalStorage} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";
import Constants from "utils/constants";
import moment from "moment";
import Configs from "configs";
import { toast } from "react-toastify";
import TableProjectsOverview from "../table/ProjectsOverview";

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"></Icon>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function ProjectsOverview({history}) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const authState = useSelector(({auth}) => auth);
  const commonState = useSelector(({common}) => common);
  const masterState = useSelector(({master}) => master);
  const projectState = useSelector(({project}) => project);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
  });
  const [dataSelect, setDataSelect] = useState({
    employees: [],
    sector: [],
    status: [],
  });
  const [formData, setFormData] = useState({
    year: new Date(moment().year()),
    rangeStart: new Date(moment().year() + "/01/01"),
    rangeEnd: new Date(moment().year() + "/12/31"),
    statusID: "",
    ownerID: "",
    sectorID: "",
    page: 1,
  });
  const [data, setData] = useState({
    list: [],
    count: 0,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeYear = e => {
    if (moment(e).year() !== moment(formData.year).year()) {
      setFormData({
        ...formData,
        year: e,
        rangeStart: new Date(
          e + "/" +
          (moment(formData.rangeStart).month() + 1) + "/" +
          moment(formData.rangeStart).date()
        ),
        rangeEnd: new Date(
          e + "/" +
          (moment(formData.rangeEnd).month() + 1) + "/" +
          moment(formData.rangeEnd).date()
        ),
      });
    }
  };

  const onChangeSelect = e => setFormData({...formData, [e.key]: e.value});

  // const onChangeDate = (key, value) => {
  //   setFormData({...formData, [key]: value});
  // };

  const paginate = pageNumber => {
    if (pageNumber !== formData.page) {
      let tmpData = {...formData};
      tmpData.page = pageNumber;
      setFormData(tmpData);
      onChangePage(pageNumber);
    }
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Users,PrjSector,PrjStatus",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onCheckLocal = () => {
    let fFilter = getLocalStorage(Constants.LS_FILTER_PROJECTS_OVERVIEW);
    if (fFilter) {
      setFormData({
        ...formData,
        year: new Date(fFilter.year + ""),
        rangeStart: new Date(fFilter.rangeStart),
        rangeEnd: new Date(fFilter.rangeEnd),
        statusID: fFilter.statusID,
        ownerID: fFilter.ownerID,
        sectorID: fFilter.sectorID,
      });
      onStartGetData(
        fFilter.year,
        fFilter.rangeStart,
        fFilter.rangeEnd,
        fFilter.statusID,
        fFilter.ownerID,
        fFilter.sectorID,
      );
    } else {
      let filter = {
        year: moment().year(),
        rangeStart: moment().year() + "/01/01",
        rangeEnd: moment().year() + "/12/31",
        statusID: null,
        ownerID: null,
        sectorID: null,
      };
      setLocalStorage(Constants.LS_FILTER_PROJECTS_OVERVIEW, JSON.stringify(filter));
      onStartGetData();
    }
  };

  const onChangePage = newPage => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Change params
      let tmpFormData = {...formData};
      tmpFormData.page = newPage;
      setFormData(tmpFormData);
      // Call api
      onStartGetData(
        moment(formData.year).format("YYYY"),
        moment(formData.year).year() + "/01/01",
        moment(formData.year).year() + "/12/31",
        formData.statusID,
        formData.ownerID,
        formData.sectorID,
        newPage,
      );
    }
  };

  const onSearchFilter = () => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Save local
      let filter = {
        year: moment(formData.year).year(),
        rangeStart: formData.year.getFullYear() + "/01/01",
        rangeEnd: formData.year.getFullYear() + "/12/31",
        statusID: formData.statusID,
        ownerID: formData.ownerID,
        sectorID: formData.sectorID,
      };
      setLocalStorage(Constants.LS_FILTER_PROJECTS_OVERVIEW, JSON.stringify(filter));
      // Change params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      setFormData(tmpFormData);
      // Call api
      onStartGetData(
        moment(formData.year).year(),
        formData.year.getFullYear() + "/01/01",
        formData.year.getFullYear() + "/12/31",
        formData.statusID,
        formData.ownerID,
        formData.sectorID,
      );
    }
  };

  const onStartGetData = (
    year = moment().year(),
    rangeStart = formData.rangeStart,
    rangeEnd = formData.rangeEnd,
    statusID = formData.statusID,
    ownerID = formData.ownerID,
    sectorID = formData.sectorID,
    page = 1,
  ) => {
    let params = {
      Year: year,
      FromDate: rangeStart,
      ToDate: rangeEnd,
      SectorID: sectorID,
      OwnerID: ownerID,
      StatusID: statusID,
      PageNum: page,
      PageSize: Configs.perPageOverview,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    console.log('[LOG] ===  ===> ', params);
    dispatch(Actions.fFetchProjectsOverview(params, history));
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpPrjStatus = masterState["projectStatus"].map(item => {
        return {value: item.statusID, label: item.statusName};
      });
      let tmpUsers = masterState["users"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpPrjSector = masterState["projectSector"].map(item => {
        return {value: item.sectorID, label: item.sectorName};
      });
      setDataSelect({
        employees: [...dataSelect.employees, ...tmpUsers],
        status: [...dataSelect.status, ...tmpPrjStatus],
        sector: [...dataSelect.sector, ...tmpPrjSector],
      });
    } else {
      dispatch(Actions.resetProject());
      let tmpData = {...data};
      tmpData.list = projectState["projectsOverview"];
      tmpData.count = projectState["rowsOverview"];
      setData(tmpData);
      setLoading({main: false, search: false});
    }
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetProject());
    dispatch(Actions.resetMasterData());
    toast(error, {type: "error"})
    setLoading({main: false, search: false});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    onGetMasterData();
    onCheckLocal();
  }, []);

  useEffect(() => {
    if (loading.main) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError(masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    loading.main,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!projectState["submittingProjectsOverview"]) {
        if (projectState["successProjectsOverview"] && !projectState["errorProjectsOverview"]) {
          return onSuccess("List");
        }
        if (!projectState["successProjectsOverview"] && projectState["errorProjectsOverview"]) {
          return onError(projectState["errorHelperProjectsOverview"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    projectState["submittingProjectsOverview"],
    projectState["successProjectsOverview"],
    projectState["errorListProject"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search;
  return (
    <React.Fragment>
      <Head title={t("project:main_title")} />

      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockHeadContent>
            <BlockTitle tag="h4">{t("projects_overview:title")}</BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools"></div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                    <ul className="btn-toolbar gx-1">
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                            <div className="dot dot-primary"></div>
                            <Icon name="filter-alt"></Icon>
                          </DropdownToggle>
                          <DropdownMenu
                            right
                            className="filter-wg dropdown-menu-xl"
                            style={{ overflow: "visible" }}
                          >
                            <div className="dropdown-head">
                              <h6>
                                {t("project:filter_project").toUpperCase()}
                              </h6>
                            </div>
                            <div className="dropdown-body dropdown-body-rg">
                              <Row className="gx-6 gy-3">
                                <Col size="12">
                                  <FormGroup className="form-group" style={{zIndex: 10000}}>
                                    <label className="overline-title overline-title-alt">
                                      {t("project:year")}
                                    </label>
                                    <DatePicker
                                      className="form-control"
                                      disabled={disabled}
                                      dateFormat="yyyy"
                                      showYearPicker
                                      selected={formData.year}
                                      onChange={onChangeYear}
                                    />
                                  </FormGroup>
                                </Col>
                                {/* <Col xs="6" sm="6" md="6">
                                  <FormGroup className="form-group">
                                    <label className="overline-title overline-title-alt">
                                      {t("projects_overview:from_date")}
                                    </label>
                                    <div className="form-control-wrap">
                                      <div className="form-icon form-icon-left">
                                        <Icon name="calendar"></Icon>
                                      </div>
                                      <DatePicker
                                        className="form-control"
                                        wrapperClassName="start-m"
                                        selected={formData.rangeStart}
                                        dateFormat="dd/MM/yyyy"
                                        startDate={formData.rangeStart}
                                        endDate={formData.rangeEnd}
                                        disabled={disabled}
                                        selectsStart
                                        onChange={date => onChangeDate("rangeStart", date)}
                                      />
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col xs="6" sm="6" md="6">
                                  <FormGroup className="form-group">
                                    <label className="overline-title overline-title-alt">
                                      {t("projects_overview:to_date")}
                                    </label>
                                    <div className="form-control-wrap">
                                      <div className="form-icon form-icon-left">
                                        <Icon name="calendar"></Icon>
                                      </div>
                                      <DatePicker
                                        className="form-control"
                                        wrapperClassName="end-m"
                                        selected={formData.rangeEnd}
                                        dateFormat="dd/MM/yyyy"
                                        startDate={formData.rangeStart}
                                        endDate={formData.rangeEnd}
                                        minDate={formData.rangeStart}
                                        disabled={disabled}
                                        selectsEnd
                                        onChange={date => onChangeDate("rangeEnd", date)}
                                      />
                                     </div>
                                  </FormGroup>
                                </Col> */}
                                <Col size="12">
                                  <FormGroup className="form-group">
                                    <label className="overline-title overline-title-alt">
                                      {t("task:owner")}
                                    </label>
                                    <RSelect
                                      name="owner"
                                      isMulti={false}
                                      isDisabled={disabled}
                                      options={dataSelect.employees}
                                      value={formData.ownerID}
                                      placeholder={t("task:holder_owner")}
                                      onChange={e => onChangeSelect({key: "ownerID", value: e})}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col size="12">
                                  <FormGroup className="form-group">
                                    <label className="overline-title overline-title-alt">
                                      {t("task:status")}
                                    </label>
                                    <RSelect
                                      name="status"
                                      isMulti={false}
                                      isDisabled={disabled}
                                      options={dataSelect.status}
                                      value={formData.statusID}
                                      placeholder={t("task:holder_status")}
                                      onChange={e => onChangeSelect({key: "statusID", value: e})}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col size="12">
                                  <FormGroup className="form-group">
                                    <label className="overline-title overline-title-alt">
                                      {t("task:sector")}
                                    </label>
                                    <RSelect
                                      name="sector"
                                      isMulti={false}
                                      isDisabled={disabled}
                                      options={dataSelect.sector}
                                      value={formData.sectorID}
                                      placeholder={t("task:holder_sector")}
                                      onChange={e => onChangeSelect({key: "sectorID", value: e})}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                            <div className="dropdown-foot between">
                              <Button color="primary" disabled={disabled} onClick={onSearchFilter}>
                                {loading.search && <Spinner className="mr-1" size="sm" color="light" />}
                                {!loading.search && <Icon name="filter"></Icon>}
                                <span>{t("common:filter")}</span>
                              </Button>
                            </div>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableProjectsOverview
              disabled={disabled}
              dataProjects={data.list}
            />

            {/** Paging table */}
            <PreviewAltCard>
              {disabled ? (
                <div className="text-center">
                  <Spinner size="sm" color="primary" />
                </div>
              ) : 
              data.list.length > 0 ? (
                <PaginationComponent
                  itemPerPage={Configs.perPageProject}
                  totalItems={data.count}
                  currentPage={formData.page}
                  paginate={paginate}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">{t("common:no_data")}</span>
                </div>
              )}
            </PreviewAltCard>
          </DataTable>
        </Block>
        
      </Content>
    </React.Fragment>
  );
};

export default ProjectsOverview;
