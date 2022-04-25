import React, { useEffect, useState } from "react";
import qs from 'qs'

import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { cleanObject } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [ users, setUsers ] = useState([])
  const [ param, setParam ] = useState({
    name: '',
    personId: ''
  })
  const[ list, setList ] =useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
}