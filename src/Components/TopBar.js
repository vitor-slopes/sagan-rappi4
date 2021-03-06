import React from "react";
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

const TopBarWrapper = styled.div`
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d3d3d4 ;
`
const ReturnButton = styled.div`
    padding: 0;
    margin: 0;
    position: absolute;
    left: 16px;
`
const CenterTitle = styled.p`
  padding: 0;
  margin: 0;
`

export default function TopBar(props) {
  return (
    <Paper elevation={0} >
      <TopBarWrapper>
        <ReturnButton>
          {props.returnButton}
        </ReturnButton>
        <CenterTitle>
          {props.title}
        </CenterTitle>
      </TopBarWrapper>
    </Paper>
  )
}