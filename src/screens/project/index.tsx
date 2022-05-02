import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { DashboardScreen } from "../dashboard";
import { Epic } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="dashboard">
            <Link to="dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">Epic</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="epic" element={<Epic />} />
          <Route
            path=""
            element={
              <Navigate
                to={window.location.pathname + "/dashboard"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
  overflow: hidden;
`;
