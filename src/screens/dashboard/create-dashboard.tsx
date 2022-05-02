import React, { useState } from "react";
import { useDashboardQueryKey, useProjectIdInUrl } from "./util";
import { Input } from "antd";
import { useAddDashboard } from "../../utils/dashboard";
import { Container } from "./dashboard-column";

export const CreateDashboard = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addDashboard } = useAddDashboard(useDashboardQueryKey());

  const submit = async () => {
    await addDashboard({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size="large"
        placeholder="Title"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
