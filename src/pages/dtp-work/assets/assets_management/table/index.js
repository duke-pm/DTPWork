import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  Block,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  TooltipComponent,
  Icon,
  Row,
  Col,
  UserAvatar,
} from "../../../../../components/Component";
/** COMMON */
import Configs from "../../../../../configs";
import Routes from "../../../../../services/routesApi";
import {
  getCookies,
  numberFormat,
  findUpper,
  log,
} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

function TableAssets(props) {
  const {t} = useTranslation();
  const {
    history,
    commonState,
    authState,
    loadingTab,
    idxTab,
    dataAssets,
    onUpdateItem,
    onApprovedRecallItem,
    onRepairItem,
    onLiquidationItem,
    onReuseItem,
    onUpdateHistory,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    history: false,
  });
  const [viewHistory, setViewHistory] = useState(false);
  const [data, setData] = useState(dataAssets);
  const [formData, setFormData] = useState(null);

  /**
   ** FUNCTIONS
   */
  const onGetDetailsData = item => {
    setViewHistory(true);
    setLoading({...loading, history: true});
    onViewDetails(item);
    let params = {
      ID: item.assetID,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchHistoryAsset(params, history));
  };

  const onViewDetails = item => {
    let fItem = data.find(f => f.assetID === item.assetID);
    if (fItem) setFormData(fItem);
  };

  const onPrepareHistoryData = () => {
    let tmpFormData = {...formData};
    if (formData) {
      tmpFormData.history = [];
      if (approvedState["historyAsset"].length > 0) {
        tmpFormData.history = approvedState["historyAsset"];
      }
      setFormData(tmpFormData);
      onDone();
    } else {
      onDone();
    }
  };

  const onDone = () => {
    dispatch(Actions.resetListAssets());
    setLoading({history: false});
  };

  const onError = e => {
    log('[LOG] ===  ===> ', e);
    dispatch(Actions.resetListAssets());
    setLoading({history: false});
  };

  const onExportReport = (type) => {
    const token = getCookies("access_token");
		const params = {
			UserToken: token,
			AssetID: formData?.assetID,
		};
		window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
      type === 2
        ? Routes.APPROVED.EXPORT_APPROVED_ASSETS
        : Routes.APPROVED.EXPORT_RECALL_ASSETS
    }?value=${JSON.stringify(params)}`;
  };

  const onDownloadFile = link => {
		window.open(`${Configs.hostAPI}/${link}`, "_blank");
  };

  const onUpdateHis = dataH => {
    setViewHistory(false);
    onUpdateHistory(
      formData,
      dataH,
      () => onGetDetailsData(formData),
    );
  };

  const onUpdateAsset = (ev) => {
    ev.preventDefault();
    setViewHistory(false);
    onUpdateItem(formData, () => onGetDetailsData(formData));
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataAssets);
  }, [dataAssets]);

  useEffect(() => {
    if (loading.history) {
      if (!approvedState["submittingHistoryAsset"]) {
        if (approvedState["successHistoryAsset"] && !approvedState["errorHistoryAsset"]) {
          return onPrepareHistoryData();
        }

        if (!approvedState["successHistoryAsset"] && approvedState["errorHistoryAsset"]) {
          return onError(approvedState["errorHelperHistoryAsset"]);
        }
      }
    }
  }, [
    loading.history,
    approvedState["submittingHistoryAsset"],
    approvedState["successHistoryAsset"],
    approvedState["errorHistoryAsset"],
  ]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow size="md">
          <span className="fw-bold">{t("assets:code")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("assets:name")}</span>
        </DataTableRow>
        <DataTableRow size="lg">
          <span className="fw-bold">{t("assets:group")}</span>
        </DataTableRow>
        <DataTableRow size="lg">
          <span className="fw-bold">{t("assets:type")}</span>
        </DataTableRow>
        <DataTableRow size="lg">
          <span className="fw-bold">{t("assets:purchase_date")}</span>
        </DataTableRow>
        {(idxTab === 1 || idxTab === 2 || idxTab === 3) && (
          <DataTableRow size="lg">
            <span className="fw-bold">{t("assets:origin_price")}</span>
          </DataTableRow>
        )}
        {(idxTab === 0 || idxTab === 4) && (
          <DataTableRow>
            <span className="fw-bold">{t("assets:status")}</span>
          </DataTableRow>
        )}
        {(idxTab !== 5) && (
          <DataTableRow size="lg">
            <span className="fw-bold">{t("assets:dept_manager")}</span>
          </DataTableRow>
        )}
        {(idxTab !== 1 && idxTab !== 2 && idxTab !== 3 && idxTab !== 5) && (
          <DataTableRow size="lg">
            <span className="fw-bold">{t("assets:user_manager")}</span>
          </DataTableRow>
        )}
        {(idxTab !== 5) && (
          <DataTableRow size="lg">
            <span className="fw-bold">{t("assets:region")}</span>
          </DataTableRow>
        )}
        {(idxTab === 5) && (
          <DataTableRow size="md">
            <span className="fw-bold">{t("assets:liquidation_date")}</span>
          </DataTableRow>
        )}
        <DataTableRow size="lg">
          <span className="fw-bold">{t("assets:code_base")}</span>
        </DataTableRow>
        <DataTableRow className="nk-tb-col-tools" />
      </DataTableHead>

      {(!loadingTab && data.length > 0)
        ? data.map((item, index) => {
          let statusColor = "secondary";
          switch (item.statusID) {
            case 2:
              statusColor = "success";
              break;
            case 3:
              statusColor = "warning";
              break;
            case 4:
              statusColor = "danger";
              break;
            case 5:
              statusColor = "danger";
              break;
            case 6:
              statusColor = "primary";
              break;
            default:
              statusColor = "secondary";
              break;
          };

          return (
            <DataTableItem key={item.assetID + "_table_item_" + index}>
              <DataTableRow size="md">
                <span className={`tb-lead ${item.isProcessing ? "text-danger" : "text-primary"}`}>
                  {item.assetCode}
                </span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{item.assetName}</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span>{item.groupName}</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span>{item.assetTypeName}</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span>
                  {moment(item.purchaseDate).format("DD/MM/YYYY")}
                </span>
              </DataTableRow>
              {(idxTab === 1 || idxTab === 2 || idxTab === 3) && (
                <DataTableRow size="lg">
                  <span>{item.originalPrice !== 0
                    ? numberFormat(item.originalPrice)
                    : "-"}
                  </span>
                </DataTableRow>
              )}
              {(idxTab === 0 || idxTab === 4) && (
                <DataTableRow>
                  <span className={`dot bg-${statusColor} d-mb-none`} />
                  <span className={`badge badge-sm badge-dot has-bg badge-${
                      statusColor
                    } d-none d-mb-inline-flex`}>
                    {item.statusName}
                  </span>
                </DataTableRow>
              )}
              {(idxTab !== 5) && (
                <DataTableRow size="lg">
                  <span>{item.deptNameManager || "-"}</span>
                </DataTableRow>
              )}
              {(idxTab !== 1 && idxTab !== 2 && idxTab !== 3 && idxTab !== 5) && (
                <DataTableRow size="lg">
                  {item.empName && (
                    <div className="user-card">
                      <UserAvatar className="sm" text={findUpper(item.empName)} />
                      <div className="user-info">
                        <span className="tb-lead">{item.empName}</span>
                      </div>
                    </div>
                  )}
                  {!item.empName && <span>{"-"}</span>}
                </DataTableRow>
              )}
              {(idxTab !== 5) && (
                <DataTableRow size="lg">
                  <span>{item.regionName || "-"}</span>
                </DataTableRow>
              )}
              {(idxTab === 5) && (
                <DataTableRow size="md">
                  <span>
                    {moment(item.transDate).format("DD/MM/YYYY")}
                  </span>
                </DataTableRow>
              )}
              <DataTableRow size="lg">
                <span>{item.remarks || "-"}</span>
              </DataTableRow>
              {(idxTab < 4 || idxTab === 5) && (
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <li>
                      {((idxTab === 0 || idxTab === 2) && item.isProcessing)
                      ? (
                        <TooltipComponent
                          tag="a"
                          containerClassName="btn btn-trigger btn-icon"
                          iconClass="text-danger"
                          icon="info"
                          direction="top"
                          id={"tooltip_" + index}
                          text={item.requestTypeName}
                        />
                      ) : (
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                            <Icon name="more-h"/>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem
                                  tag="a"
                                  className="cursor-pointer link link-sm"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    onGetDetailsData(item);
                                  }}
                                >
                                  <Icon name="eye"/>
                                  <span>{t("assets:view_details")}</span>
                                </DropdownItem>
                              </li>
                              {idxTab === 1 && (
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onApprovedRecallItem("approved", item);
                                    }}
                                  >
                                    <Icon name="clipboad-check"/>
                                    <span>{t("assets:approved_assets")}</span>
                                  </DropdownItem>
                                </li>
                              )}
                              {idxTab === 2 && (
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onApprovedRecallItem("recall", item);
                                    }}
                                  >
                                    <Icon name="undo"/>
                                    <span>{t("assets:recall_assets")}</span>
                                  </DropdownItem>
                                </li>
                              )}
                              {idxTab === 2 && (
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onRepairItem(item);
                                    }}
                                  >
                                    <Icon name="setting"/>
                                    <span>{t("assets:repair_assets")}</span>
                                  </DropdownItem>
                                </li>
                              )}
                              {idxTab === 3 && (
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onLiquidationItem(item);
                                    }}
                                  >
                                    <Icon name="money"/>
                                    <span>{t("assets:liquidation_assets")}</span>
                                  </DropdownItem>
                                </li>
                              )}
                              {idxTab === 3 && (
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onReuseItem(item);
                                    }}
                                  >
                                    <Icon name="undo"/>
                                    <span>{t("assets:reuse_assets")}</span>
                                  </DropdownItem>
                                </li>
                              )}
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      )}
                    </li>
                  </ul>
                </DataTableRow>
              )}
              {idxTab === 4 && (
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                          <Icon name="more-h"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onGetDetailsData(item);
                                }}>
                                <Icon name="eye"/>
                                <span>{t("assets:view_details")}</span>
                              </DropdownItem>
                            </li>
                            {item.statusID === 4 && (
                              <>
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onLiquidationItem(item);
                                    }}
                                  >
                                    <Icon name="money"/>
                                    <span>{t("assets:liquidation_assets")}</span>
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    className="cursor-pointer link link-sm"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onRepairItem(item);
                                    }}
                                  >
                                    <Icon name="setting"/>
                                    <span>{t("assets:repair_assets")}</span>
                                  </DropdownItem>
                                </li>
                              </>
                            )}
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              )}
            </DataTableItem>
          );
        })
        : null}

      {/** Modal asset history */}
      <Modal
        isOpen={viewHistory}
        className="modal-dialog-centered"
        modalClassName="zoom"
        style={{maxWidth: "1300px"}}
        toggle={() => setViewHistory(false)}>
        <ModalHeader className="fc-event-secondary" toggle={() => setViewHistory(false)}>
          {t("assets:informations_details")}
        </ModalHeader>
        <ModalBody>
          {/** Basic informations */}
          <Block>
            <div className="d-flex justify-content-between data-head">
              <h6 className="overline-title mb-0">{t("assets:title_details")}</h6>
              <a
                className="link link-sm cursor-pointer text-primary"
                onClick={onUpdateAsset}>
                <span>{t("assets:update_assets")}</span>
                <Icon name="edit"/>
              </a>
            </div>
            <div className="mt-3">
              <Row className="g-3">
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:code")}</span>
                    <span className="profile-ud-value text-primary">{formData?.assetCode}</span>
                  </div>
                </Col>
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:name")}</span>
                    <span className="profile-ud-value">{formData?.assetName}</span>
                  </div>
                </Col>
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:group")}</span>
                    <span className="profile-ud-value">{formData?.groupName}</span>
                  </div>
                </Col>
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:status")}</span>
                    <span className="profile-ud-value">
                      <span
                        className={`dot bg-${
                          formData?.statusID === 1
                            ? "gray"
                            : formData?.statusID === 2
                              ? "success"
                              : formData?.statusID === 3
                                ? "warning"
                                : (formData?.statusID === 4 || formData?.statusID === 5)
                                  ? "danger"
                                  : "primary"
                        } d-mb-none`}
                      ></span>
                      <span
                        className={`badge badge-sm badge-dot has-bg badge-${
                          formData?.statusID === 1
                            ? "gray"
                            : formData?.statusID === 2
                              ? "success"
                              : formData?.statusID === 3
                                ? "warning"
                                : (formData?.statusID === 4 || formData?.statusID === 5)
                                  ? "danger"
                                  : "primary"
                        } d-none d-mb-inline-flex`}
                      >
                        {formData?.statusName}
                      </span>
                    </span>
                  </div>
                </Col>
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:origin_price")}</span>
                    <span className="profile-ud-value">
                      {numberFormat(formData?.originalPrice) || "-"}
                    </span>
                  </div>
                </Col>
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:purchase_date")}</span>
                    <span className="profile-ud-value">
                      {moment(formData?.purchaseDate).format("DD/MM/YYYY") || "-"}
                    </span>
                  </div>
                </Col>
                <Col xs="6" sm="6" md="6" lg="3">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("assets:description")}</span>
                    <span className="profile-ud-value">
                      {formData?.descr || "-"}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </Block>

          {/** Process */}
          <Block>
            <div className="data-head">
              <h6 className="overline-title">{t("assets:use_process")}</h6>
            </div>
            {loading.history && (
              <div className="text-center mt-3">
                <Spinner size="sm" color="primary" />
              </div>
            )}
            {!loading.history && formData?.history.length > 0 && (
              <DataTableBody compact>
                <DataTableHead className="nk-tb-item">
                  <DataTableRow>
                    <span className="fw-bold">{t("assets:date")}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="fw-bold">{t("assets:code_staff")}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="fw-bold">{t("assets:name_staff")}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="fw-bold">{t("assets:department_staff")}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="fw-bold">{t("assets:region_staff")}</span>
                  </DataTableRow>
                  <DataTableRow>
                    <span className="fw-bold">{t("assets:status")}</span>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <span className="fw-bold">{t("assets:description")}</span>
                  </DataTableRow>
                  <DataTableRow className="nk-tb-col-tools" />
                </DataTableHead>

                {formData?.history.length > 0 &&
                  formData?.history.map((itemH, indexH) => {
                  let statusColor = "gray";
                  switch (itemH.transStatus) {
                    case 2:
                      statusColor = "success";
                      break;
                    case 3:
                      statusColor = "warning";
                      break;
                    case 4:
                      statusColor = "danger";
                    break;
                    case 5:
                      statusColor = "danger";
                    break;
                    case 6:
                      statusColor = "primary";
                      break;
                    default:
                      statusColor = "gray";
                      break;
                  };

                  return (
                    <DataTableItem key={itemH.empCode + "_history_item_" + indexH}>
                      <DataTableRow>
                        <span>{moment(itemH.transDate).format("DD/MM/YYYY")}</span>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span className="tb-lead text-primary">#{itemH.empCode}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <div className="user-card">
                          <UserAvatar className="sm" text={findUpper(itemH.empName)} />
                          <div className="user-info">
                            <span className="tb-lead">{itemH.empName}</span>
                            <span className="ff-italic fs-10px">{itemH.jobTitle}</span>
                          </div>
                        </div>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span>{itemH.deptName}</span>
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <span>{itemH.regionName}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span className={`dot bg-${statusColor} d-mb-none`} />
                        <span
                          className={`badge badge-sm badge-dot has-bg badge-${
                            statusColor
                          } d-none d-mb-inline-flex`}>
                          {itemH.statusName}
                        </span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{itemH.reasons}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        {itemH.transStatus !== 5 && itemH.transStatus !== 5 && (
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                                  <Icon name="more-h"/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <ul className="link-list-opt no-bdr">
                                    {(itemH.transStatus === 2 || itemH.transStatus === 7) && (
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          className="cursor-pointer link link-sm"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            onExportReport(itemH.transStatus);
                                          }}>
                                          <Icon name="download-cloud"/>
                                          <span>{t("assets:export_report")}</span>
                                        </DropdownItem>
                                      </li>
                                    )}
                                    {itemH.attachFiles !== "" && (
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          className="cursor-pointer link link-sm"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            onDownloadFile(itemH.attachFiles);
                                          }}>
                                          <Icon name="download"/>
                                          <span>{t("assets:download_attach_file")}</span>
                                        </DropdownItem>
                                      </li>
                                    )}
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        className="cursor-pointer link link-sm"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          onUpdateHis(itemH);
                                        }}>
                                        <Icon name="edit-alt"/>
                                        <span>{t("assets:update_file")}</span>
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        )}
                      </DataTableRow>
                    </DataTableItem>
                  );
                })}
              </DataTableBody>
            )}
            {!loading.history && formData?.history.length === 0 && (
              <div className="text-center">
                <span className="text-silent">{t("common:no_data")}</span>
              </div>
            )}
          </Block>
        </ModalBody>
      </Modal>
    </DataTableBody>
  );
};

export default TableAssets;
