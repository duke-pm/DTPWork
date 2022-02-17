import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  DataTableHead, DataTableItem, DataTableRow, TooltipComponent,
  PaginationComponent, PreviewAltCard, Icon,
} from "components/Component";
/** COMMON */
import Configs from "configs";
import {numberFormat} from "utils/Utils";

function TableAssets(props) {
  const {t} = useTranslation();
  const {idxTab, dataAssets, curPage, countItem, onChangePage} = props;

  /** Use state */
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [data, setData] = useState(dataAssets);
  const [currentPage, setCurrentPage] = useState(curPage);

  // selects all the order
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteOrder = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // selects one order
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    onChangePage(idxTab, pageNumber);
  };

  useEffect(() => {
    setData(dataAssets);
  }, [dataAssets]);

  return (
    <div>
      <div className="nk-tb-list is-separate is-medium mb-3">
        <DataTableHead className="nk-tb-item">
          <DataTableRow className="nk-tb-col-check">
            <div className="custom-control custom-control-sm custom-checkbox notext">
              <input
                type="checkbox"
                className="custom-control-input form-control"
                id="pid-all"
                onChange={(e) => selectorCheck(e)}
              />
              <label className="custom-control-label" htmlFor="pid-all"></label>
            </div>
          </DataTableRow>
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
          <DataTableRow className="nk-tb-col-tools" />
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
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      defaultChecked={item.check}
                      id={item.assetID + "oId-all"}
                      key={Math.random()}
                      onChange={(e) => onSelectChange(e, item.assetID)}
                    />
                    <label className="custom-control-label" htmlFor={item.assetID + "oId-all"}></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-sub text-primary">{item.assetCode}</span>
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
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <li
                      className="nk-tb-action-hidden"
                      onClick={() => {
                        // loadDetail(item.id);
                        // toggle("details");
                      }}
                    >
                      <TooltipComponent
                        tag="a"
                        containerClassName="btn btn-trigger btn-icon"
                        id={"view" + item.assetID}
                        icon="eye"
                        direction="top"
                        text="View Details"
                      />
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdown"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  // loadDetail(item.assetID);
                                  // toggle("details");
                                }}
                              >
                                <Icon name="eye"></Icon>
                                <span>Asset Details</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              </DataTableItem>
            );
          })
          : null}
      </div>

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
            <span className="text-silent">No orders found</span>
          </div>
        )}
      </PreviewAltCard>
    </div>
  );
};

export default TableAssets;
