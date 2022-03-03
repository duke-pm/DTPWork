import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
/** COMPONENTS */
import Content from "layout/content/Content";
import Head from "layout/head/Head";
/** COMMON */
/** REDUX */
import * as Actions from "redux/actions";

function BlankPage(props) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
  });

  /**
   ** FUNCTIONS
   */
  const onStartGetData = (
    
  ) => {
    let params = {

    };

  };

  const onSuccess = () => {
  
  };

  const onError = error => {
    console.log('[LOG] === onError ===> ', error);
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
  
  }, []);

  /**
   ** RENDER
   */
  return (
    <React.Fragment>
      <Head title="Blank Page" />
      <Content>
        
      </Content>
    </React.Fragment>
  );
};

export default BlankPage;
