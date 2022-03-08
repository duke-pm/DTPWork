import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
/** COMPONENTS */
import {
  DataTableItem,
  DataTableRow,
  Icon,
  Button,
} from "components/Component";
/** REDUX */
import * as Actions from "redux/actions";

function RowTable(props) {
  const {
    loading,
    className,
    padding,
    disabled,
    index,
    data,
    changeAll,
    onChangeParent,
  } = props;

  const dispatch = useDispatch();

  /** Use state */
  const [viewChild, setViewChild] = useState(false);
  const [checkAll, setCheckAll] = useState(changeAll);
  const [check, setCheck] = useState({
    access: data.isAccess,
    read: data.isRead,
    write: data.isWrite,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeView = () => {
    setViewChild(!viewChild);
  };

  const onCheckParent = status => {
    if (data.countChild > 0) {
      let childs = data.lstPermissionItem, tmpTrue = [];
      tmpTrue = childs.filter(f => f.isAccess === status);

      if (tmpTrue.length === 0) {
        setCheckAll(status);
      }
      if (tmpTrue.length > 0 && tmpTrue.length < data.countChild) {
        setCheck({...check, access: true});
      }
      if (tmpTrue.length > 0 && tmpTrue.length === data.countChild) {
        setCheck({...check, access: status});
        setCheckAll(status);
      }
    }
  };

  const onChangeAccess = () => {
    let tmpCheck = {...check};
    tmpCheck.read = !check.access;
    tmpCheck.write = !check.access;
    tmpCheck.access = !check.access;
    setCheck(tmpCheck);
    dispatch(Actions.updateRoleLocal({menuID: data.menuID, update: tmpCheck}));
    if (onChangeParent) {
      onChangeParent(tmpCheck.access);
    }
  };

  const onChangeRead = () => {
    let tmpCheck = {
      access: true,
      read: true,
      write: true,
    };
    if (check.read && check.write) {
      tmpCheck.access = true;
      tmpCheck.read = false;
      tmpCheck.write = true;
    }
    if (!check.read && !check.write) {
      tmpCheck.access = true;
      tmpCheck.read = true;
      tmpCheck.write = false;
    }
    if (check.read && !check.write) {
      tmpCheck.access = false;
      tmpCheck.read = false;
      tmpCheck.write = false;
    }
    if (!check.read && check.write) {
      tmpCheck.access = true;
      tmpCheck.read = true;
      tmpCheck.write = true;
    }
    setCheck(tmpCheck);
    dispatch(Actions.updateRoleLocal({menuID: data.menuID, update: tmpCheck}));
    if (onChangeParent) {
      onChangeParent(tmpCheck.access);
    }
  };

  const onChangeWrite = () => {
    let tmpCheck = {
      access: true,
      read: true,
      write: true,
    };
    if (check.read && check.write) {
      tmpCheck.access = true;
      tmpCheck.read = true;
      tmpCheck.write = false;
    }
    if (!check.read && !check.write) {
      tmpCheck.access = true;
      tmpCheck.read = false;
      tmpCheck.write = true;
    }
    if (check.read && !check.write) {
      tmpCheck.access = true;
      tmpCheck.read = true;
      tmpCheck.write = true;
    }
    if (!check.read && check.write) {
      tmpCheck.access = false;
      tmpCheck.read = false;
      tmpCheck.write = false;
    }
    setCheck(tmpCheck);
    dispatch(Actions.updateRoleLocal({menuID: data.menuID, update: tmpCheck}));
    if (onChangeParent) {
      onChangeParent(tmpCheck.access);
    }
  };

  useEffect(() => {
    if (data) {
      let tmpCheck = {...check};
      if (tmpCheck.access !== data.isAccess) {
        tmpCheck.access = data.isAccess;
      }
      if (tmpCheck.read !== data.isRead) {
        tmpCheck.read = data.isRead;
      }
      if (tmpCheck.write !== data.isWrite) {
        tmpCheck.write = data.isWrite;
      }
      setCheck(tmpCheck);
    }
  }, [
    data,
  ]);

  useEffect(() => {
    if (data) {
      if (changeAll) {
        setCheck({
          access: changeAll,
          read: changeAll,
          write: changeAll,
        });
      } else {
        setCheck({
          access: data.isAccess,
          read: data.isRead,
          write: data.isWrite,
        });
      }
    }
  }, [
    data,
    changeAll,
  ]);

  /**
   ** RENDER
   */
  return (
    <>
      <DataTableItem key={data.menuID + "_menu_" + index}>
        {data.countChild > 0 ? (
          <DataTableRow className="nk-tb-col-check">
            <div className="text-center">
              <Button
                className={`${!viewChild && "btn-dim"}`}
                color="primary"
                size="sm"
                disabled={loading}
                onClick={onChangeView}>
                <Icon name={viewChild ? "minus" : "plus"} />  
              </Button>
            </div>
          </DataTableRow>
        ) : (
          <DataTableRow className="nk-tb-col-check">
            <div className="border-table-item">

            </div>
          </DataTableRow>
        )}
        <DataTableRow>
          <span className={`tb-lead ${className + padding}`}>{data.menuName}</span>
        </DataTableRow>
        <DataTableRow>
          <div className="form-control-wrap">
            <div className="custom-control custom-control-sm custom-checkbox">
              <input
                className="custom-control-input form-control"
                id={`check_access_${data.menuID}`}
                name={`check_access_${data.menuID}`}
                type="checkbox"
                disabled={disabled || loading || data.countChild > 0}
                checked={check.access}
                onChange={onChangeAccess}
              />
              <label className="custom-control-label" htmlFor={`check_access_${data.menuID}`}>
                {""}
              </label>
            </div>
          </div>
        </DataTableRow>
        <DataTableRow>
          {data.countChild === 0 ? (
            <div className="form-control-wrap">
              <div className="custom-control custom-control-sm custom-checkbox">
                <input
                  className="custom-control-input form-control"
                  id={`check_read_${data.menuID}`}
                  name={`check_read_${data.menuID}`}
                  type="checkbox"
                  disabled={disabled || loading}
                  checked={check.read}
                  onChange={onChangeRead}
                />
                <label className="custom-control-label" htmlFor={`check_read_${data.menuID}`}>
                  {""}
                </label>
              </div>
            </div>
          ) : <span />}
        </DataTableRow>
        <DataTableRow>
          {data.countChild === 0 ? (
            <div className="form-control-wrap">
              <div className="custom-control custom-control-sm custom-checkbox">
                <input
                  className="custom-control-input form-control"
                  id={`check_write_${data.menuID}`}
                  name={`check_write_${data.menuID}`}
                  type="checkbox"
                  disabled={disabled || loading}
                  checked={check.write}
                  onChange={onChangeWrite}
                />
                <label className="custom-control-label" htmlFor={`check_write_${data.menuID}`}>
                  {""}
                </label>
              </div>
            </div>
          ) : <span />}
        </DataTableRow>
      </DataTableItem>
      {data.countChild > 0 && viewChild && data.lstPermissionItem.map((item, index) => {
        return (
          <RowTable
            key={item.menuID + "_menu_" + index}
            className="ml-"
            padding={padding + 2}
            loading={loading}
            index={index}
            data={item}
            changeAll={checkAll}
            onChangeParent={onCheckParent}
          />
        )
      })}
    </>
  );
};

export default RowTable;
