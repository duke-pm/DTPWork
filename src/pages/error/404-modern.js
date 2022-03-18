import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
/** COMPONENTS */
import {Button} from "../../components/Component";
import PageContainer from "../../layout/page-container/PageContainer";
/** COMMON */
import ErrorImage from "../../images/gfx/error-404.svg";

const Error404Modern = () => {
  const {t} = useTranslation();
  return (
    <PageContainer>
      <div className="nk-block nk-block-middle wide-md mx-auto">
        <div className="nk-block-content nk-error-ld text-center">
          <img className="nk-error-gfx" src={ErrorImage} alt="error" />
          <div className="wide-xs mx-auto">
            <h3 className="nk-error-title">{t("common:title_404")}</h3>
            <p className="nk-error-text">{t("common:des_404")}</p>
            <Link to={`${process.env.PUBLIC_URL}/`}>
              <Button color="primary" size="lg" className="mt-2">
                {t("common:go_back_home")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default Error404Modern;
