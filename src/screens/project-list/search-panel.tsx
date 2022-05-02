/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline" css={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="Project Title"
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="Owner"
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};
