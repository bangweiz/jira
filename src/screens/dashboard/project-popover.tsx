import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "../project-list/utils";

export const ProjectPopover = () => {
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const { open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">Liked Projects</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type="link">
        Create a Project
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>Projects</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
