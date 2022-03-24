import React, {useState} from "react";
/** COMPONENTS */
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../../../components/Component";
import { useTranslation } from "react-i18next";

const Homepage = () => {
  const {t} = useTranslation();
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title={t("dashboard:main_title")}></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h5">{t("dashboard:main_title")}</BlockTitle>
            </BlockHeadContent>
            
          </BlockBetween>
        </BlockHead>
        <Block>
          
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Homepage;
