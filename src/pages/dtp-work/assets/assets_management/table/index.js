import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
  UncontrolledDropdown, DropdownMenu, DropdownToggle,
  DropdownItem, Modal, ModalBody,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  DataTableBody, DataTableHead, DataTableItem, DataTableRow,
  Block, BlockHead, BlockTitle, PaginationComponent,
  PreviewAltCard, Icon, TooltipComponent, BlockHeadContent, BlockBetween,
} from "components/Component";
/** COMMON */
import Configs from "configs";
import {numberFormat} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function TableAssets(props) {
  const {t} = useTranslation();
  const {
    history,
    commonState,
    authState,
    idxTab,
    dataAssets,
    curPage,
    countItem,
    onChangePage,
    onUpdateItem,
    onApprovedRecallItem,
    onRepairItem,
    onLiquidationItem,
    onReuseItem,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    history: false,
  });
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [data, setData] = useState(dataAssets);
  const [formData, setFormData] = useState(null);
  const [currentPage, setCurrentPage] = useState(curPage);

  /**
   ** FUNCTIONS
   */
  // Change Page
  const onGetDetailsData = itemId => {
    setLoading({...loading, history: true});
    onViewDetails(itemId);
    toggle("details");
    let params = {
      ID: itemId,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchHistoryAsset(params, history));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    onChangePage(idxTab, pageNumber);
  };

  const toggle = type => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const onViewDetails = itemId => {
    let fItem = data.find(f => f.assetID === itemId);
    if (fItem) {
      setFormData(fItem);
    }
  };

  const onFormCancel = () => {
    setView({add: false, details: false});
    onResetForm();
  };

  const onResetForm = () => {
    setFormData(null);
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
    setLoading({history: false});
  };

  const onError = e => {
    console.log('[LOG] ===  ===> ', e);
    setLoading({history: false});
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
    <React.Fragment>
      {/** Data assets */}
      <div className="nk-tb-list is-separate is-medium mb-3">
        <DataTableHead className="nk-tb-item">
          <DataTableRow>
            <span className="lead-text">{t("assets:code")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("assets:name")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("assets:group")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("assets:type")}</span>
          </DataTableRow>
          {(idxTab === 0 || idxTab === 4) && (
            <DataTableRow>
              <span className="lead-text">{t("assets:status")}</span>
            </DataTableRow>
          )}
          <DataTableRow>
            <span className="lead-text">{t("assets:purchase_date")}</span>
          </DataTableRow>
          {(idxTab === 1 || idxTab === 2 || idxTab === 3) && (
            <DataTableRow>
              <span className="lead-text">{t("assets:origin_price")}</span>
            </DataTableRow>
          )}
          {(idxTab !== 5) && (
            <DataTableRow>
              <span className="lead-text">{t("assets:dept_manager")}</span>
            </DataTableRow>
          )}
          {(idxTab !== 1 && idxTab !== 2 && idxTab !== 3 && idxTab !== 5) && (
            <DataTableRow>
              <span className="lead-text">{t("assets:user_manager")}</span>
            </DataTableRow>
          )}
          {(idxTab !== 5) && (
            <DataTableRow>
              <span className="lead-text">{t("assets:region")}</span>
            </DataTableRow>
          )}
          {(idxTab === 5) && (
            <DataTableRow>
              <span className="lead-text">{t("assets:liquidation_date")}</span>
            </DataTableRow>
          )}
          <DataTableRow>
            <span className="lead-text">{t("assets:code_base")}</span>
          </DataTableRow>
          {idxTab !== 5 && <DataTableRow className="nk-tb-col-tools" />}
        </DataTableHead>

        {data.length > 0
          ? data.map((item, index) => {
            let statusColor = "gray";
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
                statusColor = "gray";
                break;
            };

            return (
              <DataTableItem key={item.assetID + "_table_item_" + index}>
                <DataTableRow>
                  <span className={`tb-sub ${item.isProcessing ? "text-danger" : "text-primary"}`}>
                    {item.assetCode}
                  </span>
                </DataTableRow>
                <DataTableRow>
                  <span>{item.assetName}</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-sub">{item.groupName}</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-sub">{item.assetTypeName}</span>
                </DataTableRow>
                {(idxTab === 0 || idxTab === 4) && (
                  <DataTableRow>
                    <span
                      className={`dot bg-${statusColor} d-mb-none`}
                    ></span>
                    <span
                      className={`badge badge-sm badge-dot has-bg badge-${
                        statusColor
                      } d-none d-mb-inline-flex`}
                    >
                      {item.statusName}
                    </span>
                  </DataTableRow>
                )}
                <DataTableRow>
                  <span className="tb-sub">
                    {moment(item.purchaseDate, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY")}
                  </span>
                </DataTableRow>
                {(idxTab === 1 || idxTab === 2 || idxTab === 3) && (
                  <DataTableRow>
                    <span className="tb-sub">{item.originalPrice !== 0
                      ? numberFormat(item.originalPrice)
                      : "-"}
                    </span>
                  </DataTableRow>
                )}
                {(idxTab !== 5) && (
                  <DataTableRow>
                    <span className="tb-sub">{item.deptNameManager || "-"}</span>
                  </DataTableRow>
                )}
                {(idxTab !== 1 && idxTab !== 2 && idxTab !== 3 && idxTab !== 5) && (
                  <DataTableRow>
                    <span className="tb-sub">{item.empName || "-"}</span>
                  </DataTableRow>
                )}
                {(idxTab !== 5) && (
                  <DataTableRow>
                    <span className="tb-sub">{item.regionName || "-"}</span>
                  </DataTableRow>
                )}
                {(idxTab === 5) && (
                  <DataTableRow>
                    <span className="tb-sub">
                      {moment(item.transDate, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY")}
                    </span>
                  </DataTableRow>
                )}
                <DataTableRow>
                  <span className="tb-sub">{item.remarks || "-"}</span>
                </DataTableRow>
                {idxTab < 4 && (
                  <DataTableRow className="nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li>
                        {((idxTab === 0 || idxTab === 2) && item.isProcessing)
                        ? (
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            iconClass="text-danger"
                            icon="help"
                            direction="top"
                            id="tooltipProcess"
                            text={item.requestTypeName}
                          />
                        ) : (
                          <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                {idxTab === 0 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownViewDetails"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onGetDetailsData(item.assetID);
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>{t("assets:view_details")}</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                {idxTab === 1 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownApproved"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onApprovedRecallItem("approved", item);
                                      }}
                                    >
                                      <Icon name="clipboad-check"></Icon>
                                      <span>{t("assets:approved_assets")}</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                {idxTab === 1 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownUpdate"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onUpdateItem(item);
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>{t("assets:update_assets")}</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                {idxTab === 2 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownRecall"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onApprovedRecallItem("recall", item);
                                      }}
                                    >
                                      <Icon name="undo"></Icon>
                                      <span>{t("assets:recall_assets")}</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                {idxTab === 2 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownRepair"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onRepairItem(item);
                                      }}
                                    >
                                      <Icon name="setting"></Icon>
                                      <span>{t("assets:repair_assets")}</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                {idxTab === 3 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownRecall"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onLiquidationItem(item);
                                      }}
                                    >
                                      <Icon name="money"></Icon>
                                      <span>{t("assets:liquidation_assets")}</span>
                                    </DropdownItem>
                                  </li>
                                )}
                                {idxTab === 3 && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownRepair"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onReuseItem(item);
                                      }}
                                    >
                                      <Icon name="undo"></Icon>
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
                          {item.statusID === 4 && (
                            <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                          )}
                          {item.statusID == 4 && (
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdownRecall"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onLiquidationItem(item);
                                    }}
                                  >
                                    <Icon name="money"></Icon>
                                    <span>{t("assets:liquidation_assets")}</span>
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdownRepair"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      onRepairItem(item);
                                    }}
                                  >
                                    <Icon name="setting"></Icon>
                                    <span>{t("assets:repair_assets")}</span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          )}
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                  </DataTableRow>
                )}
              </DataTableItem>
            );
          })
          : null}
      </div>

      {/** Paging */}
      <PreviewAltCard>
        {data.length > 0 ? (
          <PaginationComponent
            itemPerPage={Configs.perPage}
            totalItems={countItem}
            currentPage={currentPage}
            paginate={paginate}
          />
        ) : (
          <div className="text-center">
            <span className="text-silent">{t("common:no_data")}</span>
          </div>
        )}
      </PreviewAltCard>

      {/** Modal asset details */}
      {idxTab === 0 && (
        <Modal
          style={{maxWidth: '1300px', width: '100%'}}
          className="modal-dialog-centered"
          isOpen={view.details}
          size="xl"
          toggle={onFormCancel}
        >
          <ModalBody>
            <BlockHead>
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle tag="h3">{t("assets:informations_details")}</BlockTitle>
                </BlockHeadContent>
                <a href="#cancel" className="close">
                  {" "}
                  <Icon name="cross-sm" onClick={onFormCancel} />
                </a>
              </BlockBetween>
            </BlockHead>

            <div className="nk-divider divider md"></div>

            {/** Basic informations */}
            <Block>
              <BlockHead>
                <BlockTitle tag="h6">{t("assets:title_details")}</BlockTitle>
              </BlockHead>
              <div className="profile-ud-list">
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:code")}</span>
                    <span className="profile-ud-value text-primary">{formData?.assetCode}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:name")}</span>
                    <span className="profile-ud-value">{formData?.assetName}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:group")}</span>
                    <span className="profile-ud-value">{formData?.groupName}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:purchase_date")}</span>
                    <span className="profile-ud-value">{moment(formData?.purchaseDate).format("DD/MM/YYYY") || "-"}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:origin_price")}</span>
                    <span className="profile-ud-value">{numberFormat(formData?.originalPrice) || "-"}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:status")}</span>
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
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("assets:description")}</span>
                    <span className="profile-ud-value">{formData?.descr}</span>
                  </div>
                </div>
              </div>
            </Block>

            <div className="nk-divider divider md"></div>

            {/** Use process */}
            <Block>
              <BlockHead>
                <BlockTitle tag="h6">{t("assets:use_process")}</BlockTitle>
              </BlockHead>

              {loading.history && (
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("common:loading")}</span>
                </div>
              )}
              {!loading.history && formData?.history.length > 0 && (
                <DataTableBody bodyclass="nk-tb-tnx">
                  <DataTableHead className="nk-tb-item">
                    <DataTableRow>
                      <span className="lead-text">{t("assets:date")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:code_staff")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:name_staff")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:position_staff")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:department_staff")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:region_staff")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:status")}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="lead-text">{t("assets:description")}</span>
                    </DataTableRow>
                  </DataTableHead>

                  {formData?.history.map((itemH, indexH) => {
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
                          <span className="tb-sub">{moment(itemH.transDate).format("DD/MM/YYYY")}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-sub text-primary">{itemH.empCode}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-sub">{itemH.empName}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-sub">{itemH.jobTitle}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-sub">{itemH.deptName}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-sub">{itemH.regionName}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span
                            className={`dot bg-${statusColor} d-mb-none`}
                          ></span>
                          <span
                            className={`badge badge-sm badge-dot has-bg badge-${
                              statusColor
                            } d-none d-mb-inline-flex`}
                          >
                            {itemH.statusName}
                          </span>
                        </DataTableRow>
                        <DataTableRow>
                          <span className="tb-sub">{itemH.reasons}</span>
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
      )}
    </React.Fragment>
  );
};

export default TableAssets;
